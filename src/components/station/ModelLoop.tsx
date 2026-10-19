import { useEffect, useRef } from 'react';
import type * as T from 'three';

// Modelli 3D in loop, con three.js caricato solo qui quando la scheda compare.
// Casa: Kenney City Kit Suburban + Furniture Kit (CC0), cresce dalle fondamenta e dentro è arredata.
// Otto: costruito in codice, si apre pezzo per pezzo e mostra cosa c'è dentro.
type Kind = 'house' | 'otto';
type Three = typeof import('three');
const ease = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x);

// Mobili nella pianta della casa (unità del modello). Ingresso sul lato -z, muro di fondo a z 0.43.
// Piano terra: tutto il rettangolo (x -0.82…0.74). Piano di sopra a y 0.46, solo sulla parte destra (x -0.47…0.76).
const FLOOR = .04, UP = .46, S = .033;
const furniture: [string, number, number, number, number, number?, number?][] = [
  // salotto: TV contro il muro di fondo, divano rivolto alla TV
  ['cabinetTelevision', -.45, FLOOR, .385, Math.PI], ['televisionModern', -.45, FLOOR + 3.1 * S, .4, Math.PI],
  ['rugRectangle', -.45, FLOOR, .18, 0], ['tableCoffee', -.45, FLOOR + .003, .19, 0], ['loungeSofa', -.45, FLOOR, -.02, 0],
  ['pottedPlant', -.76, FLOOR, .37, 0],
  // cucina lungo il muro di fondo, tavolo con due sedie
  ['kitchenStove', .2, FLOOR, .355, Math.PI], ['kitchenCabinet', .35, FLOOR, .355, Math.PI], ['kitchenFridge', .5, FLOOR, .37, Math.PI],
  ['tableRound', .38, FLOOR, .0, 0], ['chair', .2, FLOOR, .0, Math.PI / 2], ['chair', .56, FLOOR, .0, -Math.PI / 2],
  ['pottedPlant', .66, FLOOR, -.24, 0],
  // piano di sopra: muro divisorio e due camere
  ['wall', .15, UP, .045, Math.PI / 2, 1.9, .8],
  ['bedDouble', -.16, UP, .165, 0], ['bookcaseClosedDoors', -.36, UP, -.21, 0], ['lampSquareTable', -.41, UP, .32, 0],
  ['bedSingle', .55, UP, .165, 0], ['sideTable', .33, UP, .31, Math.PI], ['lampSquareTable', .33, UP + 3.84 * S, .31, 0],
  ['bookcaseClosedDoors', .64, UP, -.21, 0], ['pottedPlant', .25, UP, -.2, 0],
];

async function buildHouse(THREE: Three, pivot: T.Group, camera: T.PerspectiveCamera) {
  const [{ GLTFLoader }, { OBJLoader }, { MTLLoader }] = await Promise.all([
    import('three/examples/jsm/loaders/GLTFLoader.js'), import('three/examples/jsm/loaders/OBJLoader.js'), import('three/examples/jsm/loaders/MTLLoader.js'),
  ]);
  const house = (await new GLTFLoader().loadAsync('/sito-social/house.glb')).scene;
  const room = new THREE.Group(); room.add(house);
  // Ogni mobile: centrato, appoggiato a terra, scalato e messo al suo posto.
  const cache = new Map<string, Promise<T.Group>>();
  const load = (name: string) => {
    if (!cache.has(name)) cache.set(name, new MTLLoader().setPath('/sito-social/furniture/').loadAsync(`${name}.mtl`).then(m => { m.preload(); return new OBJLoader().setMaterials(m).setPath('/sito-social/furniture/').loadAsync(`${name}.obj`); }));
    return cache.get(name)!;
  };
  await Promise.all(furniture.map(async ([name, x, y, z, rot, sx = 1, sy = 1]) => {
    const obj = (await load(name)).clone(true);
    const b = new THREE.Box3().setFromObject(obj), c = b.getCenter(new THREE.Vector3());
    obj.position.set(-c.x, -b.min.y, -c.z);
    const item = new THREE.Group(); item.add(obj); item.scale.set(S * sx, S * sy, S); item.rotation.y = rot; item.position.set(x, y, z);
    room.add(item);
  }));

  const box = new THREE.Box3().setFromObject(house), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
  const scale = 2 / Math.max(size.x, size.y, size.z);
  room.position.copy(center).multiplyScalar(-scale); room.scale.setScalar(scale); pivot.add(room);

  // Un piano di taglio sale dal basso: la casa spunta dalle fondamenta e, mentre cresce, si vedono le stanze arredate.
  const h = size.y * scale, bottom = -h / 2, plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), bottom);
  room.traverse(o => {
    const mesh = o as T.Mesh; if (!mesh.isMesh) return;
    (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => { m.clippingPlanes = [plane]; m.side = THREE.DoubleSide; });
  });
  const w = size.x * scale * 1.08, d = size.z * scale * 1.08;
  const ring = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, .001, d)), new THREE.LineBasicMaterial({ color: 0xc5f476, transparent: true }));
  // Il prato sotto la casa: più largo e un filo più in basso, così non si sovrappone alla base del modello.
  const lawn = new THREE.Mesh(new THREE.BoxGeometry(w * 1.35, .08, d * 1.6), new THREE.MeshStandardMaterial({ color: 0x86b04a, roughness: .85 }));
  lawn.position.y = bottom - .05; pivot.add(ring, lawn);
  camera.position.set(2.5, 1.9, 3.3); camera.lookAt(0, -.15, 0);

  return (t: number) => {
    const c = t % 8; // 0-3.6 cresce · 3.6-5.6 ferma · 5.6-7 rientra · pausa
    const k = c < 3.6 ? ease(c / 3.6) : c < 5.6 ? 1 : c < 7 ? 1 - ease((c - 5.6) / 1.4) : 0;
    const y = bottom + k * (h + .02); plane.constant = y; ring.position.y = y;
    (ring.material as T.LineBasicMaterial).opacity = k > 0 && k < 1 ? 1 : 0;
    pivot.rotation.y = .55 + t * .22;
  };
}

function buildOtto(THREE: Three, pivot: T.Group, camera: T.PerspectiveCamera, RoundedBoxGeometry: typeof import('three/examples/jsm/geometries/RoundedBoxGeometry.js').RoundedBoxGeometry) {
  const shell = new THREE.MeshPhysicalMaterial({ color: 0xeef0e2, roughness: .35, clearcoat: 1, clearcoatRoughness: .2 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x121a12, roughness: .3, metalness: .2 });
  const glow = new THREE.MeshStandardMaterial({ color: 0xc5f476, emissive: 0xb4f05a, emissiveIntensity: 1.6 });
  const pcb = new THREE.MeshStandardMaterial({ color: 0x2f5a24, roughness: .6 }), chip = new THREE.MeshStandardMaterial({ color: 0x1b1f1b, roughness: .4, metalness: .5 });
  const cell = new THREE.MeshStandardMaterial({ color: 0x3b4a33, roughness: .4, metalness: .6 }), metal = new THREE.MeshStandardMaterial({ color: 0xb9c2b0, roughness: .25, metalness: .9 });
  const parts: { o: T.Object3D; base: T.Vector3; out: T.Vector3; delay: number }[] = [];
  const add = (o: T.Object3D, x: number, y: number, z: number, out: [number, number, number], delay = 0) => { o.position.set(x, y, z); pivot.add(o); parts.push({ o, base: o.position.clone(), out: new THREE.Vector3(...out), delay }); return o; };
  const mesh = (g: T.BufferGeometry, m: T.Material) => new THREE.Mesh(g, m);

  // Testa: guscio, schermo, occhi e sorriso luminosi, orecchie, antenna.
  add(mesh(new RoundedBoxGeometry(1.6, 1.2, 1.1, 6, .32), shell), 0, .55, -.05, [0, .25, -.55], .1);
  add(mesh(new RoundedBoxGeometry(1.3, .85, .12, 4, .2), dark), 0, .55, .52, [0, .05, .7], .25);
  const eyes = new THREE.Group();
  [-.26, .26].forEach(x => { const e = mesh(new THREE.CapsuleGeometry(.075, .16, 6, 12), glow); e.position.x = x; eyes.add(e); });
  const smile = mesh(new THREE.TorusGeometry(.13, .025, 8, 24, Math.PI), glow); smile.rotation.z = Math.PI; smile.position.y = -.2; eyes.add(smile);
  add(eyes, 0, .6, .6, [0, .05, 1.15], .35);
  [-1, 1].forEach(s => { const ear = mesh(new THREE.CylinderGeometry(.2, .2, .16, 24), shell); ear.rotation.z = Math.PI / 2; const ring = mesh(new THREE.TorusGeometry(.13, .025, 8, 24), glow); ring.rotation.y = Math.PI / 2; ring.position.x = s * .085; ear.add(ring); add(ear, s * .86, .55, -.05, [s * .55, 0, 0], .2); });
  const antenna = new THREE.Group(); const rod = mesh(new THREE.CylinderGeometry(.03, .03, .35, 12), metal); rod.position.y = .17; antenna.add(rod);
  const bulb = mesh(new THREE.SphereGeometry(.09, 20, 16), glow); bulb.position.y = .38; antenna.add(bulb);
  add(antenna, 0, 1.15, -.05, [0, .75, 0], .05);
  // Dentro la testa: la scheda con i chip.
  const board = mesh(new THREE.BoxGeometry(1.05, .6, .05), pcb);
  [[-.3, .1], [.05, .12], [.32, -.05], [-.1, -.15]].forEach(([x, y], i) => { const c = mesh(new THREE.BoxGeometry(i ? .16 : .26, i ? .12 : .2, .05), chip); c.position.set(x, y, .04); board.add(c); });
  add(board, 0, .55, .22, [0, .35, .35], .3);

  // Corpo: guscio, nucleo luminoso, batteria, braccia, pannello frontale con il led.
  add(mesh(new RoundedBoxGeometry(1.05, .85, .8, 6, .26), shell), 0, -.55, -.02, [0, -.35, -.45], .5);
  const panel = mesh(new RoundedBoxGeometry(.6, .38, .06, 4, .1), dark); const led = mesh(new THREE.SphereGeometry(.05, 16, 12), glow); led.position.set(0, -.06, .04); panel.add(led);
  add(panel, 0, -.5, .4, [0, -.1, .75], .6);
  add(mesh(new THREE.IcosahedronGeometry(.16, 1), glow), 0, -.5, .1, [0, 0, .45], .55);
  const battery = new THREE.Group(); const bodyCell = mesh(new THREE.CylinderGeometry(.13, .13, .5, 20), cell); bodyCell.rotation.z = Math.PI / 2; battery.add(bodyCell);
  const cap = mesh(new THREE.CylinderGeometry(.06, .06, .06, 16), glow); cap.rotation.z = Math.PI / 2; cap.position.x = .28; battery.add(cap);
  add(battery, 0, -.6, -.2, [0, -.2, -.85], .65);
  [-1, 1].forEach(s => { const arm = mesh(new THREE.CapsuleGeometry(.12, .4, 6, 14), shell); arm.rotation.z = s * .35; add(arm, s * .68, -.55, 0, [s * .5, -.05, 0], .45); });

  pivot.scale.setScalar(.95); pivot.position.y = .08;
  camera.position.set(0, .2, 6.2); camera.lookAt(0, .05, 0);
  return (t: number) => {
    const c = t % 8; // 0-1.6 intero · 1.6-3.8 si apre · 3.8-5.6 aperto · 5.6-7.6 si richiude
    parts.forEach(p => {
      const k = c < 1.6 ? 0 : c < 3.8 ? ease((c - 1.6 - p.delay) / 1.3) : c < 5.6 ? 1 : c < 7.6 ? 1 - ease((c - 5.6 - (.7 - p.delay)) / 1.3) : 0;
      p.o.position.copy(p.base).addScaledVector(p.out, k);
    });
    pivot.rotation.y = Math.sin(t * .45) * .75;
    glow.emissiveIntensity = 1.3 + .4 * Math.sin(t * 3);
  };
}

export default function ModelLoop({ kind }: { kind: Kind }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current; if (!el) return;
    let disposed = false, stop = () => {};
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    Promise.all([import('three'), import('three/examples/jsm/geometries/RoundedBoxGeometry.js')]).then(async ([THREE, { RoundedBoxGeometry }]) => {
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.localClippingEnabled = true;
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, .5, 30);
      scene.add(new THREE.HemisphereLight(0xf2ffe0, 0x1a2715, 2.2));
      const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(4, 6, 5); scene.add(key);
      const rim = new THREE.DirectionalLight(0xc5f476, 1.6); rim.position.set(-5, 2, -4); scene.add(rim);
      const pivot = new THREE.Group(); scene.add(pivot);

      const resize = () => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
      const ro = new ResizeObserver(resize); ro.observe(el); resize();
      stop = () => { ro.disconnect(); renderer.dispose(); renderer.domElement.remove(); };

      const update = kind === 'house' ? await buildHouse(THREE, pivot, camera) : buildOtto(THREE, pivot, camera, RoundedBoxGeometry);
      if (disposed) return;
      update(still ? 4.6 : 0); renderer.render(scene, camera);

      let visible = true, raf = 0; const t0 = performance.now();
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf && !still) raf = requestAnimationFrame(frame); }, { rootMargin: '100px' });
      io.observe(el);
      function frame(now: number) {
        raf = 0; if (disposed) return;
        // Nell'anteprima nascosta della hero non si disegna.
        if (!el!.closest('.web-preview>div:not(.on)')) { update((now - t0) / 1000); renderer.render(scene, camera); }
        if (visible) raf = requestAnimationFrame(frame);
      }
      if (!still) raf = requestAnimationFrame(frame);
      stop = () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); renderer.dispose(); renderer.domElement.remove(); };
    }).catch(() => { /* senza WebGL resta lo spazio vuoto */ });

    return () => { disposed = true; stop(); };
  }, [kind]);

  return <div ref={host} className={`model-loop model-${kind}`} aria-hidden="true"/>;
}
