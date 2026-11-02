// Archivio AI: la rete della hero, un grafo alla Obsidian disegnato su canvas.
// Le forze si calcolano una volta all'avvio e poi si fermano: ciò che si muove dopo è una deriva lenta e una rotazione,
// funzioni lisce del tempo, così nessun pallino trema. La simulazione si riaccende solo mentre si trascina un nodo.

export type Kind = 'doc' | 'audio' | 'video' | 'image' | 'mail';
type Node = { label: string; kind: Kind | 'hub'; hub: number; orphan: boolean; x: number; y: number; vx: number; vy: number; fx: number | null; fy: number | null; deg: number; charge: number; a: number; lab: number; glow: number; slot: number; ox: number; oy: number; vis: number; p1: number; p2: number; w1: number; w2: number; px: number; py: number };
type Link = { s: number; t: number; d: number; k: number; on: number };

export const kindColors: Record<Kind | 'hub', string> = { hub: '#c5f476', doc: '#d3dccb', audio: '#8fd6c0', video: '#b9aef2', image: '#e6cf96', mail: '#a9c4dc' };
const hubs = ['Pratiche', 'Contratti', 'Clienti', 'Riunioni', 'Sopralluoghi', 'Corrispondenza', 'Fatture', 'Archivio storico'];
const hubLinks = [[0, 1], [0, 2], [1, 2], [3, 2], [4, 0], [5, 2], [6, 2], [7, 0], [5, 1], [3, 4]];
const extraLeaves = [19, 12, 15, 10, 11, 13, 10, 8];
// i file con un nome vero: le ricerche della hero li ritrovano. [nome, tipo, cartella, collegati]
const files: [string, Kind, number, string[]?][] = [
  ['Contratto locazione via Roma.pdf', 'doc', 1, ['Re: rinnovo contratto', 'Visura catastale.pdf']],
  ['Re: rinnovo contratto', 'mail', 5], ['Visura catastale.pdf', 'doc', 0],
  ['Atto compravendita 2021.pdf', 'doc', 0, ['Planimetria piano 1.jpg']], ['Planimetria piano 1.jpg', 'image', 0],
  ['Procura speciale.pdf', 'doc', 0], ['Bozza ricorso.docx', 'doc', 0], ['Scadenze 2025.xlsx', 'doc', 0],
  ['Preventivo 114-2024.pdf', 'doc', 2, ['Riunione soci 12 mar.m4a', 'Re: preventivo impianto', 'Fattura 0381.pdf']],
  ['Re: preventivo impianto', 'mail', 5], ['Anagrafica clienti.xlsx', 'doc', 2],
  ['Riunione soci 12 mar.m4a', 'audio', 3], ['Verbale assemblea.pdf', 'doc', 3], ['Dettatura memoria.m4a', 'audio', 3], ['Riunione online 4 apr.mp4', 'video', 3],
  ['Videoperizia tetto.mp4', 'video', 4, ['Foto danni 07.jpg', 'Nota vocale cantiere.m4a']], ['Foto danni 07.jpg', 'image', 4], ['Nota vocale cantiere.m4a', 'audio', 4], ['Sopralluogo via Verdi.mp4', 'video', 4],
  ['Fwd: documenti mancanti', 'mail', 5, ['Procura speciale.pdf']],
  ['Fattura 0381.pdf', 'doc', 6], ['Fattura 0412.pdf', 'doc', 6],
  ['Scansione lettera 1998.jpg', 'image', 7, ['Atto compravendita 2021.pdf', 'Fascicolo 1987.pdf']], ['Fascicolo 1987.pdf', 'doc', 7],
];
const generic: Record<Kind, (n: number) => string> = {
  doc: n => [`Pratica ${n}.pdf`, `Relazione ${n}.docx`, `Allegato ${n}.pdf`, `Ordine ${n}.pdf`, `Delega ${n}.pdf`][n % 5],
  mail: n => ['Re: appuntamento', 'Re: documenti', 'Fwd: conferma', 'Re: sollecito', 'Re: firma'][n % 5],
  image: n => [`Foto ${n}.jpg`, `Scansione ${n}.jpg`, `Schema ${n}.png`][n % 3],
  audio: n => [`Nota vocale ${n}.m4a`, `Dettatura ${n}.m4a`][n % 2],
  video: n => [`Registrazione ${n}.mp4`, `Videochiamata ${n}.mp4`][n % 2],
};

function random(seed: number) {
  return () => { seed |= 0; seed = seed + 0x6d2b79f5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

function build() {
  const rnd = random(1912);
  const nodes: Node[] = [], links: Link[] = [];
  const node = (label: string, kind: Node['kind'], hub: number, orphan = false): number => {
    const w = (period: number) => Math.PI * 2 / period;
    nodes.push({ label, kind, hub, orphan, x: 0, y: 0, vx: 0, vy: 0, fx: null, fy: null, deg: 0, charge: kind === 'hub' ? -170 : -42, a: 1, lab: 0, glow: 0, slot: 0, ox: NaN, oy: NaN, vis: 0, p1: rnd() * 6.3, p2: rnd() * 6.3, w1: w(11 + rnd() * 8), w2: w(12 + rnd() * 9), px: 0, py: 0 });
    return nodes.length - 1;
  };
  const link = (s: number, t: number, d: number) => { links.push({ s, t, d, k: 0, on: 0 }); nodes[s].deg++; nodes[t].deg++; };
  hubs.forEach((label, i) => node(label, 'hub', i));
  hubLinks.forEach(([s, t]) => link(s, t, 150));
  const named = new Map<string, number>();
  files.forEach(([label, kind, hub]) => { const i = node(label, kind, hub); named.set(label, i); link(hub, i, 50 + rnd() * 18); });
  files.forEach(([label, , , related]) => related?.forEach(other => link(named.get(label)!, named.get(other)!, 70)));
  const kinds: Kind[] = ['doc', 'doc', 'doc', 'doc', 'mail', 'mail', 'image', 'image', 'audio', 'video'];
  const plain: number[] = [];
  extraLeaves.forEach((count, hub) => { for (let j = 0; j < count; j++) { const kind = kinds[Math.floor(rnd() * kinds.length)]; const i = node(generic[kind](100 + Math.floor(rnd() * 880)), kind, hub); plain.push(i); link(hub, i, 46 + rnd() * 22); } });
  for (let j = 0; j < 18; j++) { const s = plain[Math.floor(rnd() * plain.length)], t = plain[Math.floor(rnd() * plain.length)]; if (s !== t && nodes[s].hub !== nodes[t].hub) link(s, t, 90); }
  for (let j = 0; j < 8; j++) node(generic[kinds[j % kinds.length]](300 + j * 41), kinds[j % kinds.length], -1, true);
  links.forEach(l => { l.k = 1 / Math.min(nodes[l.s].deg, nodes[l.t].deg); });
  // posizioni di partenza: le cartelle in cerchio, i file vicino alla loro cartella, gli orfani al bordo
  nodes.forEach(n => {
    const angle = n.hub < 0 ? rnd() * 6.3 : n.hub / hubs.length * Math.PI * 2;
    const r = n.orphan ? 300 : n.kind === 'hub' ? 140 : 140 + (rnd() - .3) * 90;
    n.x = Math.cos(angle) * r + (n.kind === 'hub' ? 0 : (rnd() - .5) * 70); n.y = Math.sin(angle) * r + (n.kind === 'hub' ? 0 : (rnd() - .5) * 70);
  });
  return { nodes, links, named };
}

function tick(nodes: Node[], links: Link[], alpha: number) {
  for (const l of links) {
    const s = nodes[l.s], t = nodes[l.t];
    let dx = t.x + t.vx - s.x - s.vx, dy = t.y + t.vy - s.y - s.vy;
    const d = Math.hypot(dx, dy) || 1e-3, f = (d - l.d) / d * alpha * l.k, bias = s.deg / (s.deg + t.deg);
    dx *= f; dy *= f; t.vx -= dx * bias; t.vy -= dy * bias; s.vx += dx * (1 - bias); s.vy += dy * (1 - bias);
  }
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i], b = nodes[j], dx = b.x - a.x, dy = b.y - a.y;
    let d2 = dx * dx + dy * dy; if (d2 > 102400) continue; if (d2 < 1) d2 = 1;
    a.vx += dx * b.charge * alpha / d2; a.vy += dy * b.charge * alpha / d2;
    b.vx -= dx * a.charge * alpha / d2; b.vy -= dy * a.charge * alpha / d2;
  }
  for (const n of nodes) {
    const pull = n.orphan ? .012 : .045;
    n.vx -= n.x * pull * .62 * alpha; n.vy -= n.y * pull * alpha;
    if (n.fx !== null && n.fy !== null) { n.x = n.fx; n.y = n.fy; n.vx = n.vy = 0; continue; }
    n.vx *= .6; n.vy *= .6; n.x += n.vx; n.y += n.vy;
  }
}

type Options = { section: HTMLElement; orbit: HTMLElement; copy: HTMLElement; reduced: boolean };
export function createArchiveGraph(canvas: HTMLCanvasElement, { section, orbit, copy, reduced }: Options) {
  const ctx = canvas.getContext('2d')!;
  const { nodes, links, named } = build();
  for (let i = 0, alpha = 1; i < 320; i++, alpha *= .978) tick(nodes, links, alpha);
  // la rete ha sempre la stessa altezza; gli orfani restano appena fuori, dentro un'ellisse poco più grande
  const main = nodes.filter(n => !n.orphan), k = 230 / Math.max(...main.map(n => Math.abs(n.y)));
  nodes.forEach(n => { n.x *= k; n.y *= k; });
  const spanX = Math.max(...main.map(n => Math.abs(n.x))) + 26, spanY = 256;
  nodes.forEach(n => { if (!n.orphan) return; const e = Math.hypot(n.x / spanX, n.y / spanY), m = Math.min(e, 1.04) / e; n.x *= m; n.y *= m; });
  const neighbors = nodes.map(() => new Set<number>());
  links.forEach(l => { neighbors[l.s].add(l.t); neighbors[l.t].add(l.s); });
  links.forEach(l => { l.d = Math.hypot(nodes[l.t].x - nodes[l.s].x, nodes[l.t].y - nodes[l.s].y); });

  let width = 0, height = 0, cx = 0, cy = 0, scale = 0, goal = { cx: 0, cy: 0, scale: 1 }, fade: number | null = null, dpr = 1;
  let frame = 0, last = 0, visible = true, alpha = 0, alphaTarget = 0, angle = 0, breath = 1, now = 0, clock = 0, pace = 1;
  let hover: number | null = null, drag: number | null = null, tapTimer = 0;
  let focus: Set<number> | null = null, hit: number | null = null, scanAt = -1;
  const measure = () => {
    const box = section.getBoundingClientRect(), o = orbit.getBoundingClientRect(), c = copy.getBoundingClientRect();
    width = box.width; height = box.height; dpr = Math.min(2, Math.max(1.5, window.devicePixelRatio || 1));
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    // se lo spazio della rete cambia, la rete ci scivola dentro: solo la prima volta si piazza di colpo
    goal = { cx: o.left - box.left + o.width / 2, cy: o.top - box.top + o.height / 2, scale: Math.min(o.width / 2 / spanX, o.height / 2 / spanY) };
    if (!scale) ({ cx, cy, scale } = goal);
    fade = c.width > 0 && c.right < o.left ? c.right - box.left : null;
    wake();
  };
  const place = (n: Node, t: number) => {
    const drift = n.kind === 'hub' ? 2.5 : 5.5;
    const bloom = reduced ? 1 : Math.min(1, Math.max(0, (t - .15 - Math.hypot(n.x, n.y) / 300 * .45) / 1.5));
    const grow = .4 + .6 * (1 - Math.pow(1 - bloom, 3));
    const x = (n.x + (reduced ? 0 : Math.sin(clock * n.w1 + n.p1) * drift)) * breath * grow, y = (n.y + (reduced ? 0 : Math.cos(clock * n.w2 + n.p2) * drift)) * breath * grow;
    n.px = cx + (x * Math.cos(angle) - y * Math.sin(angle)) * scale; n.py = cy + (x * Math.sin(angle) + y * Math.cos(angle)) * scale;
    return bloom;
  };
  const toGraph = (X: number, Y: number) => {
    const x = (X - cx) / scale / breath, y = (Y - cy) / scale / breath;
    return { x: x * Math.cos(-angle) - y * Math.sin(-angle), y: x * Math.sin(-angle) + y * Math.cos(-angle) };
  };
  const nearest = (X: number, Y: number, within: number) => {
    let best: number | null = null, bestD = within * within;
    nodes.forEach((n, i) => { const d = (n.px - X) ** 2 + (n.py - Y) ** 2; if (d < bestD && n.a > .3) { best = i; bestD = d; } });
    return best;
  };
  const radius = (n: Node) => (n.kind === 'hub' ? 5.5 + Math.min(n.deg, 18) * .2 : 2.6 + Math.min(n.deg, 4) * .45) * Math.max(.8, Math.min(1.15, scale * 1.05));
  const ease = (value: number, target: number, dt: number, time: number) => value + (target - value) * (1 - Math.exp(-dt / time));
  const hubFont = '600 9px ui-monospace, SFMono-Regular, Menlo, monospace', fileFont = '500 11px "Inter Variable", Inter, system-ui, sans-serif';
  const widths = new Map<string, number>();
  const textWidth = (text: string, font: string) => { let w = widths.get(font + text); if (w === undefined) { ctx.font = font; w = ctx.measureText(text).width; widths.set(font + text, w); } return w; };
  document.fonts?.ready.then(() => widths.clear());

  const draw = (time: number) => {
    const dt = Math.min(.05, last ? (time - last) / 1000 : .016); last = time; now += dt;
    const t = now;
    // il movimento ha un suo orologio: rallenta mentre si legge un risultato e quasi si ferma sotto il mouse
    pace = ease(pace, hover !== null ? .12 : focus ? .3 : 1, dt, .6); clock += dt * pace;
    cx = ease(cx, goal.cx, dt, .3); cy = ease(cy, goal.cy, dt, .3); scale = ease(scale, goal.scale, dt, .3);
    if (!reduced) { angle = .08 * Math.sin(clock * Math.PI * 2 / 70); breath = 1 + .01 * Math.sin(clock * Math.PI * 2 / 14); }
    if (drag !== null || alpha > .002) { alpha += (alphaTarget - alpha) * .0228; tick(nodes, links, alpha); }
    let settling = Math.abs(cx - goal.cx) + Math.abs(cy - goal.cy) + Math.abs(scale - goal.scale) * 100 > .3;
    const lit = hover !== null ? new Set([hover, ...neighbors[hover]]) : focus;
    const scan = scanAt >= 0 ? (t - scanAt) / 1.05 : -1, ring = scan >= 0 && scan < 1 ? (spanX + 40) * (1 - (1 - scan) ** 2) : -1;
    nodes.forEach((n, i) => {
      const bloom = place(n, t);
      const target = (lit ? (lit.has(i) ? 1 : hover !== null ? .2 : .32) : n.kind === 'hub' ? 1 : .86) * bloom;
      const edge = fade === null ? 1 : Math.min(1, Math.max(.12, (n.px - fade + 20) / 130));
      n.a = ease(n.a, target * edge, dt, .2);
      n.lab = ease(n.lab, lit?.has(i) && n.kind !== 'hub' ? 1 : 0, dt, .22);
      const wave = ring >= 0 ? Math.exp(-(((Math.hypot(n.x, n.y) - ring) / 20) ** 2)) : 0;
      n.glow = Math.max(wave, n.glow * Math.exp(-dt / .2));
      if (Math.abs(n.a - target * edge) > .01 || n.lab > .01 && n.lab < .99 || n.glow > .01 || bloom < 1) settling = true;
    });
    links.forEach(l => { const on = lit === focus && focus?.has(l.s) && focus.has(l.t) ? 1 : 0; l.on = ease(l.on, on, dt, .45); if (Math.abs(l.on - on) > .01) settling = true; });

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
    if (ring >= 0) { ctx.beginPath(); ctx.arc(cx, cy, ring * scale * breath, 0, Math.PI * 2); ctx.strokeStyle = `rgba(197,244,118,${.22 * (1 - scan)})`; ctx.lineWidth = 1; ctx.stroke(); settling = true; }
    ctx.lineCap = 'round';
    for (const l of links) {
      const s = nodes[l.s], e = nodes[l.t], shared = Math.min(s.a, e.a);
      const lifted = hover !== null && (l.s === hover || l.t === hover);
      ctx.beginPath(); ctx.moveTo(s.px, s.py); ctx.lineTo(e.px, e.py);
      ctx.strokeStyle = lifted ? `rgba(197,244,118,${.55 * shared})` : `rgba(190,208,178,${(s.kind === 'hub' && e.kind === 'hub' ? .2 : .14) * shared})`; ctx.lineWidth = lifted ? 1.2 : .8; ctx.stroke();
      if (l.on > .01) { ctx.beginPath(); ctx.moveTo(s.px, s.py); ctx.lineTo(s.px + (e.px - s.px) * l.on, s.py + (e.py - s.py) * l.on); ctx.strokeStyle = `rgba(197,244,118,${.75 * l.on})`; ctx.lineWidth = 1.4; ctx.stroke(); }
    }
    nodes.forEach((n, i) => {
      const r = radius(n) * (1 + .45 * n.glow);
      ctx.globalAlpha = Math.min(1, n.a + n.glow * .4);
      if (n.kind === 'hub') { ctx.beginPath(); ctx.arc(n.px, n.py, r + 3.5, 0, Math.PI * 2); ctx.fillStyle = 'rgba(197,244,118,.12)'; ctx.fill(); }
      ctx.beginPath(); ctx.arc(n.px, n.py, r, 0, Math.PI * 2); ctx.fillStyle = kindColors[n.kind]; ctx.fill();
      if (n.glow > .02) { ctx.globalAlpha = n.glow * .7; ctx.fillStyle = '#c5f476'; ctx.fill(); }
      if (i === hit && focus && hover === null) { ctx.globalAlpha = n.a * .55; ctx.beginPath(); ctx.arc(n.px, n.py, r + 6 + (reduced ? 0 : 2 * Math.sin(t * 1.7)), 0, Math.PI * 2); ctx.strokeStyle = '#c5f476'; ctx.lineWidth = 1.3; ctx.stroke(); }
    });
    // etichette: prima il file trovato, poi i file accesi, poi le cartelle. Se il posto sotto il pallino è occupato
    // l'etichetta scivola sopra o di lato; se non c'è posto si spegne. Mai uno scatto.
    const rank = (i: number) => i === hover ? 4 : i === hit ? 3 : nodes[i].kind === 'hub' ? 1 : 2;
    const shown = nodes.map((_, i) => i).filter(i => nodes[i].kind === 'hub' ? nodes[i].a > .03 : nodes[i].lab > .03).sort((a, b) => rank(b) - rank(a));
    const taken: number[][] = [];
    ctx.globalAlpha = 1; ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#0c120e'; ctx.lineWidth = 3.5;
    for (const i of shown) {
      const n = nodes[i], folder = n.kind === 'hub', text = folder ? n.label.toUpperCase() : n.label, font = folder ? hubFont : fileFont;
      const w = textWidth(text, font) + 8, r = radius(n);
      const slots = [[0, r + (folder ? 15 : 14)], [0, -r - 8], [r + 6 + w / 2, 4], [-r - 6 - w / 2, 4]];
      const inside = (x: number) => Math.min(width - w / 2 - 4, Math.max(w / 2 + 4, x));
      const box = (k: number) => [inside(n.px + slots[k][0]) - w / 2, n.py + slots[k][1] - 10, w, 14];
      const free = (k: number) => { const [x, y, bw, bh] = box(k); return taken.every(([X, Y, W, H]) => x > X + W || X > x + bw || y > Y + H || Y > y + bh); };
      const slot = free(n.slot) ? n.slot : [0, 1, 2, 3].find(free) ?? -1;
      if (slot >= 0) { n.slot = slot; taken.push(box(slot)); }
      if (Number.isNaN(n.ox)) { n.ox = slots[n.slot][0]; n.oy = slots[n.slot][1]; }
      n.vis = ease(n.vis, slot < 0 ? 0 : 1, dt, .2); n.ox = ease(n.ox, slots[n.slot][0], dt, .25); n.oy = ease(n.oy, slots[n.slot][1], dt, .25);
      if (Math.abs(n.ox - slots[n.slot][0]) + Math.abs(n.oy - slots[n.slot][1]) > .2 || n.vis > .01 && n.vis < .99) settling = true;
      const strength = (folder ? Math.min(1, n.a) * .78 : i === hit && hover === null ? n.lab : n.lab * .92) * n.vis;
      if (strength < .03) continue;
      const x = inside(n.px + n.ox);
      ctx.font = font; ctx.strokeText(text, x, n.py + n.oy);
      ctx.fillStyle = folder ? `rgba(197,244,118,${strength})` : i === hit && hover === null ? `rgba(234,246,214,${strength})` : `rgba(214,224,205,${strength})`;
      ctx.fillText(text, x, n.py + n.oy);
    }
    frame = visible && (!reduced || settling || drag !== null || alpha > .002) ? requestAnimationFrame(draw) : 0;
  };
  const wake = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(draw); } };

  const point = (e: PointerEvent) => { const box = canvas.getBoundingClientRect(); return { X: e.clientX - box.left, Y: e.clientY - box.top }; };
  let down: { X: number; Y: number; at: number } | null = null;
  const onDown = (e: PointerEvent) => {
    const { X, Y } = point(e); down = { X, Y, at: performance.now() };
    if (e.pointerType !== 'mouse') return;
    const i = nearest(X, Y, 16); if (i === null) return;
    drag = i; hover = i; alphaTarget = .25; alpha = Math.max(alpha, .25);
    const g = toGraph(X, Y); nodes[i].fx = g.x; nodes[i].fy = g.y;
    canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; e.preventDefault(); wake();
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const { X, Y } = point(e);
    if (drag !== null) { const g = toGraph(X, Y); nodes[drag].fx = g.x; nodes[drag].fy = g.y; return; }
    const i = nearest(X, Y, 14);
    if (i !== hover) { hover = i; canvas.style.cursor = i === null ? '' : 'grab'; wake(); }
  };
  const onUp = (e: PointerEvent) => {
    const { X, Y } = point(e);
    if (drag !== null) { nodes[drag].fx = nodes[drag].fy = null; drag = null; alphaTarget = 0; canvas.style.cursor = 'grab'; }
    else if (e.pointerType !== 'mouse' && down && performance.now() - down.at < 350 && Math.hypot(X - down.X, Y - down.Y) < 10) {
      hover = nearest(X, Y, 22); clearTimeout(tapTimer); tapTimer = window.setTimeout(() => { hover = null; wake(); }, 3800); wake();
    }
    down = null;
  };
  const onLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse' && drag === null && hover !== null) { hover = null; canvas.style.cursor = ''; wake(); } };
  canvas.addEventListener('pointerdown', onDown); canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp); canvas.addEventListener('pointercancel', onUp); canvas.addEventListener('pointerleave', onLeave);

  const resize = new ResizeObserver(measure); resize.observe(section); resize.observe(orbit);
  const seen = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && !document.hidden; if (visible) wake(); }, { threshold: 0 });
  seen.observe(section);
  const onVisibility = () => { visible = !document.hidden; if (visible) wake(); };
  document.addEventListener('visibilitychange', onVisibility);
  measure();

  return {
    // ricerca: un'onda parte dal centro e attraversa la rete
    scan() { focus = null; hit = null; scanAt = now; wake(); },
    // risultato: il file trovato, i collegati e le loro cartelle restano accesi, il resto si abbassa
    found(target: string, related: string[]) {
      const ids = [target, ...related].map(label => named.get(label)).filter((i): i is number => i !== undefined);
      focus = new Set(ids.flatMap(i => [i, nodes[i].hub])); hit = named.get(target) ?? null; scanAt = -1; wake();
    },
    clear() { focus = null; hit = null; scanAt = -1; wake(); },
    destroy() {
      cancelAnimationFrame(frame); clearTimeout(tapTimer); resize.disconnect(); seen.disconnect(); document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointerdown', onDown); canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerup', onUp); canvas.removeEventListener('pointercancel', onUp); canvas.removeEventListener('pointerleave', onLeave);
    },
  };
}
