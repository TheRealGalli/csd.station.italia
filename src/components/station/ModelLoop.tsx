import { useEffect, useRef } from 'react';
import type * as T from 'three';

// Modello 3D in loop, con three.js caricato solo qui quando la scheda compare.
// Casa: Kenney City Kit Suburban + Furniture Kit (CC0), cresce dalle fondamenta e dentro è arredata.
type Kind = 'house';
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
  ['plantSmall1', .38, FLOOR + 3.67 * S, .0, 0], ['books', .31, FLOOR + 3.67 * S, .05, .4],
  ['kitchenCoffeeMachine', .32, FLOOR + 4.5 * S, .37, Math.PI], ['kitchenBlender', .39, FLOOR + 4.5 * S, .37, Math.PI],
  ['lampRoundFloor', -.7, FLOOR, .08, 0], ['books', -.45, FLOOR + 2.3 * S, .19, -.3],
  ['speaker', -.63, FLOOR, .39, Math.PI], ['speaker', -.27, FLOOR, .39, Math.PI],
  // piano di sopra: muro divisorio e due camere
  ['wall', .15, UP, .045, Math.PI / 2, 1.9, .8],
  ['bedDouble', -.16, UP, .165, 0], ['bookcaseClosedDoors', -.36, UP, -.21, 0], ['lampSquareTable', -.41, UP, .32, 0],
  ['bedSingle', .55, UP, .165, 0], ['sideTable', .33, UP, .31, Math.PI], ['lampSquareTable', .33, UP + 3.84 * S, .31, 0],
  ['bookcaseClosedDoors', .64, UP, -.21, 0], ['plantSmall2', .22, UP, -.22, 0],
  ['rugRound', -.16, UP, -.1, 0], ['books', .27, UP + 3.84 * S, .31, .5],
  ['desk', .42, UP, -.2, 0], ['computerScreen', .42, UP + 3.84 * S, -.23, 0], ['chairDesk', .42, UP, -.08, Math.PI],
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
    // intera · scende sulle camere (52%) · pausa · scende sul piano terra (27%) · pausa · ricresce fino al tetto.
    // Il taglio non arriva mai a terra: lì le superfici del pavimento si sovrapporrebbero (i puntini).
    const c = t % 12, lerp = (a: number, b: number, x: number) => a + (b - a) * ease(x);
    const k = c < 1.6 ? 1 : c < 3 ? lerp(1, .52, (c - 1.6) / 1.4) : c < 5.2 ? .52 : c < 6.4 ? lerp(.52, .27, (c - 5.2) / 1.2) : c < 8.8 ? .27 : c < 11 ? lerp(.27, 1, (c - 8.8) / 2.2) : 1;
    const y = bottom + k * (h + .02); plane.constant = y; ring.position.y = y;
    (ring.material as T.LineBasicMaterial).opacity = k < .999 ? 1 : 0;
    pivot.rotation.y = .55 + t * .22;
  };
}

export default function ModelLoop({ kind }: { kind: Kind }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current; if (!el) return;
    let disposed = false, stop = () => {};
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    import('three').then(async THREE => {
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

      const update = await buildHouse(THREE, pivot, camera);
      if (disposed) return;
      update(still ? 4 : 0); renderer.render(scene, camera);

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
