import { useEffect, useRef } from 'react';

// Modelli 3D veri, in loop: la casa (Kenney, CC0) cresce dalle fondamenta, il razzo (Saturn V, NASA) si scompone
// stadio per stadio e si ricompone. three.js si carica solo qui, quando la scheda compare.
type Kind = 'house' | 'rocket';
const src: Record<Kind, string> = { house: '/sito-social/house.glb', rocket: '/sito-social/saturn-v.glb' };
const ease = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x);

export default function ModelLoop({ kind }: { kind: Kind }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current; if (!el) return;
    let disposed = false, stop = () => {};
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    Promise.all([import('three'), import('three/examples/jsm/loaders/GLTFLoader.js')]).then(([THREE, { GLTFLoader }]) => {
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.localClippingEnabled = true;
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, .01, 200);
      scene.add(new THREE.HemisphereLight(0xf2ffe0, 0x1a2715, 2.2));
      const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(4, 6, 5); scene.add(key);
      const rim = new THREE.DirectionalLight(0xc5f476, 1.6); rim.position.set(-5, 2, -4); scene.add(rim);
      const pivot = new THREE.Group(); scene.add(pivot);

      let update: (t: number) => void = () => {};
      new GLTFLoader().load(src[kind], gltf => {
        if (disposed) return;
        const model = gltf.scene;
        // Centra e scala il modello in una sfera di raggio 1.
        const box = new THREE.Box3().setFromObject(model), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
        const scale = 2 / Math.max(size.x, size.y, size.z);
        model.position.sub(center).multiplyScalar(scale); model.scale.setScalar(scale);
        pivot.add(model);

        if (kind === 'house') {
          // Un piano di taglio sale dal basso: la casa spunta dalle fondamenta, con una linea lime dove sta "costruendo".
          const h = size.y * scale, bottom = -h / 2, plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), bottom);
          model.traverse(o => { const m = (o as import('three').Mesh).material as import('three').Material | undefined; if (m) { m.clippingPlanes = [plane]; m.side = THREE.DoubleSide; } });
          const w = size.x * scale * 1.08, d = size.z * scale * 1.08;
          const ring = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, .001, d)), new THREE.LineBasicMaterial({ color: 0xc5f476, transparent: true }));
          const slab = new THREE.Mesh(new THREE.BoxGeometry(w * 1.04, .04, d * 1.04), new THREE.MeshStandardMaterial({ color: 0x2d3e24, roughness: .9 }));
          slab.position.y = bottom - .02; pivot.add(ring, slab);
          camera.position.set(2.6, 1.7, 3.4); camera.lookAt(0, -.1, 0);
          update = t => {
            const c = t % 7; // 0-3 cresce · 3-5 ferma · 5-6.4 rientra · pausa
            const k = c < 3 ? ease(c / 3) : c < 5 ? 1 : c < 6.4 ? 1 - ease((c - 5) / 1.4) : 0;
            const y = bottom + k * (h + .02); plane.constant = y; ring.position.y = y;
            (ring.material as import('three').LineBasicMaterial).opacity = k > 0 && k < 1 ? 1 : 0;
            pivot.rotation.y = .5 + t * .25;
          };
        } else {
          // Il razzo, inclinato per stare nella scheda: ogni pezzo si allontana lungo l'asse, in ordine dal basso.
          const parts: { o: import('three').Object3D; base: import('three').Vector3; dir: import('three').Vector3; rank: number }[] = [];
          model.updateMatrixWorld(true);
          model.traverse(o => { if ((o as import('three').Mesh).isMesh) {
            const c = new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3());
            parts.push({ o, base: o.position.clone(), dir: c, rank: 0 });
          } });
          parts.sort((a, b) => a.dir.y - b.dir.y).forEach((p, i) => { p.rank = i / Math.max(1, parts.length - 1); });
          const inv = new THREE.Matrix4();
          parts.forEach(p => {
            // Direzione di uscita nello spazio del genitore: lungo l'asse del razzo, più un filo verso l'esterno.
            const world = new THREE.Vector3(p.dir.x * .6, (p.rank - .5) * 1.1, p.dir.z * .6);
            inv.copy(p.o.parent!.matrixWorld).invert();
            const a = new THREE.Vector3().copy(world).applyMatrix4(inv), o0 = new THREE.Vector3().applyMatrix4(inv);
            p.dir = a.sub(o0);
          });
          pivot.rotation.z = -1.15;
          camera.position.set(0, 0, 3.3); camera.lookAt(0, 0, 0);
          update = t => {
            const c = t % 8; // 0-1.6 intero · 1.6-3.8 si scompone · 3.8-5.6 aperto · 5.6-7.6 si ricompone
            parts.forEach(p => {
              const lag = p.rank * .9;
              const k = c < 1.6 ? 0 : c < 3.8 ? ease((c - 1.6 - lag * .6) / 1.2) : c < 5.6 ? 1 : c < 7.6 ? 1 - ease((c - 5.6 - (1 - p.rank) * .55) / 1.2) : 0;
              p.o.position.copy(p.base).addScaledVector(p.dir, k);
            });
            model.rotation.y = t * .5;
          };
        }
        update(still ? 4.5 : 0); renderer.render(scene, camera);
      });

      const resize = () => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
      const ro = new ResizeObserver(resize); ro.observe(el); resize();
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
