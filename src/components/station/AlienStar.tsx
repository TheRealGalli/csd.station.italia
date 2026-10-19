import { useEffect, useRef } from 'react';
import type { BufferAttribute } from 'three';

// Stella "aliena" in 3D: tante punte arrotondate che pulsano in modo irregolare e si piegano verso il mouse,
// come limatura di ferro vicino a una calamita. three.js si carica solo qui, quando il componente compare.
const SPIKES = 46;

export default function AlienStar({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current; if (!el) return;
    let disposed = false, stop = () => {};
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    import('three').then(async THREE => {
      const { mergeVertices } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(32, 1, .1, 50);
      camera.position.set(0, 0, 7.2);

      // Base: una sfera fitta; ogni frame i vertici si spostano lungo la normale in base alle punte.
      const geo = mergeVertices(new THREE.IcosahedronGeometry(1, 30));
      const pos = geo.attributes.position as BufferAttribute, base = Float32Array.from(pos.array as Float32Array);
      const spikes = Array.from({ length: SPIKES }, (_, i) => {
        const y = 1 - (i + .5) * 2 / SPIKES, r = Math.sqrt(1 - y * y), a = i * 2.39996;
        return { dir: new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r), now: new THREE.Vector3(), f: .6 + Math.random() * 1.1, p: Math.random() * 6.28, len: .5 + Math.random() * .22, amp: 0 };
      });
      const mat = new THREE.MeshPhysicalMaterial({ color: 0xb9ec62, emissive: 0x2c4a0c, roughness: .32, metalness: .08, clearcoat: 1, clearcoatRoughness: .25, sheen: 1, sheenColor: new THREE.Color(0xe3f7b8) });
      const mesh = new THREE.Mesh(geo, mat); scene.add(mesh);
      scene.add(new THREE.HemisphereLight(0xeaffc8, 0x1a2715, 1.6));
      const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 4, 5); scene.add(key);
      const rim = new THREE.DirectionalLight(0xc5f476, 2.2); rim.position.set(-4, -2, -3); scene.add(rim);

      // Il mouse si legge su tutto il contenitore (la scheda), non solo sulla tela.
      const zone = el.closest('[data-star-zone]') as HTMLElement || el;
      const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), target = new THREE.Vector3(), local = new THREE.Vector3();
      let pull = 0, want = 0;
      const move = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        // Il punto più vicino al raggio, portato sulla superficie: la direzione verso cui tirano le punte.
        ray.ray.closestPointToPoint(new THREE.Vector3(), target);
        const dist = target.length(); target.normalize();
        want = Math.max(0, Math.min(1, 1.9 - dist * .55));
      };
      const leave = () => { want = 0; };
      zone.addEventListener('pointermove', move); zone.addEventListener('pointerleave', leave);

      const resize = () => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
      const ro = new ResizeObserver(resize); ro.observe(el); resize();

      let visible = true, raf = 0, t0 = performance.now();
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }, { rootMargin: '100px' });
      io.observe(el);

      const v = new THREE.Vector3();
      function frame(now: number) {
        raf = 0; if (disposed) return;
        const t = (now - t0) / 1000;
        pull += (want - pull) * .08;
        mesh.rotation.y = t * .35; mesh.rotation.x = Math.sin(t * .23) * .35;
        local.copy(target).applyQuaternion(mesh.quaternion.clone().invert());
        for (const s of spikes) {
          // Pulsazione irregolare: due onde sfasate per punta.
          const beat = .75 + .25 * Math.sin(t * s.f + s.p) + .12 * Math.sin(t * s.f * 2.7 + s.p * 1.7);
          const near = Math.max(0, s.dir.dot(local));
          s.now.copy(s.dir).lerp(local, pull * near * near * .55).normalize();
          s.amp = s.len * beat * (1 + pull * near * near * 1.1);
        }
        const arr = pos.array as Float32Array;
        for (let i = 0; i < arr.length; i += 3) {
          v.set(base[i], base[i + 1], base[i + 2]);
          let r = 1 + .03 * Math.sin(t * 1.3 + base[i] * 3);
          for (const s of spikes) { const d = v.dot(s.now); if (d > .9) r += s.amp * Math.exp(34 * (d - 1)); }
          arr[i] = v.x * r; arr[i + 1] = v.y * r; arr[i + 2] = v.z * r;
        }
        pos.needsUpdate = true; geo.computeVertexNormals();
        renderer.render(scene, camera);
        if (visible && !still) raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);

      stop = () => {
        cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
        zone.removeEventListener('pointermove', move); zone.removeEventListener('pointerleave', leave);
        geo.dispose(); mat.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => { /* senza WebGL resta lo spazio vuoto con l'ombra */ });

    return () => { disposed = true; stop(); };
  }, []);

  return <div ref={host} className={`alien-star ${className}`} aria-hidden="true"/>;
}
