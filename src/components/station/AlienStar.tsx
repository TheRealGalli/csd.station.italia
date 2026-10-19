import { useEffect, useRef } from 'react';

// Stella "aliena" in 3D: tante punte arrotondate che pulsano in modo irregolare e si piegano verso il mouse,
// come limatura di ferro vicino a una calamita. three.js si carica solo qui, quando il componente compare.
const SPIKES = 46;

export default function AlienStar({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current; if (!el) return;
    let disposed = false, stop = () => {};
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    import('three').then(THREE => {
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(32, 1, .1, 50);
      camera.position.set(0, 0, 13);

      // La forma si calcola sulla scheda grafica: il processore aggiorna solo direzione e ampiezza delle punte.
      const geo = new THREE.IcosahedronGeometry(1, 40);
      const spikes = Array.from({ length: SPIKES }, (_, i) => {
        const y = 1 - (i + .5) * 2 / SPIKES, r = Math.sqrt(1 - y * y), a = i * 2.39996;
        return { dir: new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r), now: new THREE.Vector3(), f: .6 + Math.random() * 1.1, p: Math.random() * 6.28, len: .5 + Math.random() * .22, amp: 0 };
      });
      const uSp = { value: spikes.map(() => new THREE.Vector4()) }, uTime = { value: 0 };
      const mat = new THREE.MeshPhysicalMaterial({ color: 0xb9ec62, emissive: 0x2c4a0c, roughness: .32, metalness: .08, clearcoat: 1, clearcoatRoughness: .25, sheen: 1, sheenColor: new THREE.Color(0xe3f7b8) });
      mat.onBeforeCompile = shader => {
        shader.uniforms.uSp = uSp; shader.uniforms.uTime = uTime;
        shader.vertexShader = shader.vertexShader
          .replace('#include <common>', `#include <common>
uniform vec4 uSp[${SPIKES}];
uniform float uTime;
float starShape(vec3 p) {
  float r = 1.0 + 0.03 * sin(uTime * 1.3 + p.x * 3.0);
  for (int i = 0; i < ${SPIKES}; i++) { float d = dot(p, uSp[i].xyz); if (d > 0.88) r += uSp[i].w * exp(34.0 * (d - 1.0)); }
  return r;
}`)
          // Normale dalla forma stessa (due punti vicini sulla superficie): luce corretta anche mentre pulsa.
          .replace('#include <beginnormal_vertex>', `vec3 sDir = normalize(position);
vec3 sTa = normalize(cross(sDir, abs(sDir.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
vec3 sTb = cross(sDir, sTa);
vec3 sP0 = sDir * starShape(sDir);
vec3 sD1 = normalize(sDir + sTa * 0.006), sD2 = normalize(sDir + sTb * 0.006);
vec3 objectNormal = normalize(cross(sD1 * starShape(sD1) - sP0, sD2 * starShape(sD2) - sP0));
if (dot(objectNormal, sDir) < 0.0) objectNormal = -objectNormal;
#ifdef USE_TANGENT
vec3 objectTangent = vec3(tangent.xyz);
#endif`)
          .replace('#include <begin_vertex>', 'vec3 transformed = sP0;');
      };
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

      function frame(now: number) {
        raf = 0; if (disposed) return;
        if (el.closest('.web-preview>div:not(.on)')) { raf = requestAnimationFrame(frame); return; }
        const t = (now - t0) / 1000;
        pull += (want - pull) * .08;
        mesh.rotation.y = t * .35; mesh.rotation.x = Math.sin(t * .23) * .35;
        local.copy(target).applyQuaternion(mesh.quaternion.clone().invert());
        for (const s of spikes) {
          // Pulsazione irregolare: due onde sfasate per punta.
          const beat = .75 + .25 * Math.sin(t * s.f + s.p) + .12 * Math.sin(t * s.f * 2.7 + s.p * 1.7);
          const facing = Math.max(0, s.dir.dot(local)), near2 = facing * facing;
          // Piegatura dolce verso il mouse: oltre un certo angolo le punte si accartoccerebbero (le zone scure).
          s.now.copy(s.dir).lerp(local, pull * near2 * .22).normalize();
          s.amp = s.len * beat * (1 + pull * near2 * .7);
        }
        spikes.forEach((sp, k) => uSp.value[k].set(sp.now.x, sp.now.y, sp.now.z, sp.amp));
        uTime.value = t;
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
