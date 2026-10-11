import { WORLD, type RunnerWorld, type TaskObstacle, type Flyer } from './runnerWorld';

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
}

// The runner uses the same eyes, antenna and soft green shell as the site mascot.
function drawOtto(ctx: CanvasRenderingContext2D, world: RunnerWorld) {
  const { feet, elapsed: time, over } = world;
  const jump = WORLD.ground - feet;
  const y = feet - WORLD.playerHeight;
  ctx.save();
  ctx.fillStyle = `rgba(9,20,13,${.35 - Math.min(jump / 650, .2)})`;
  ctx.beginPath(); ctx.ellipse(WORLD.playerX + 17, WORLD.ground + 5, Math.max(9, 23 - jump / 15), 5, 0, 0, Math.PI * 2); ctx.fill();
  ctx.translate(WORLD.playerX, y);
  ctx.scale(WORLD.playerWidth / 52, WORLD.playerHeight / 78);
  const stride = !world.grounded || over ? 0 : Math.sin(time * 22) * 4;
  roundRect(ctx, 7, 68 + stride, 16, 8, 3, '#91aa78');
  roundRect(ctx, 29, 68 - stride, 16, 8, 3, '#b4ca98');
  roundRect(ctx, 12, 43, 30, 28, 8, '#cdddaf');
  roundRect(ctx, 1, 47 - stride, 8, 21, 4, '#9eb982');
  roundRect(ctx, 44, 47 + stride, 8, 21, 4, '#b7cd9c');
  roundRect(ctx, 25, -8, 3, 12, 1, '#98b37c');
  ctx.fillStyle = '#d5ff98'; ctx.beginPath(); ctx.arc(26.5, -8, 4, 0, Math.PI * 2); ctx.fill();
  const shell = ctx.createLinearGradient(0, 0, 52, 43);
  shell.addColorStop(0, '#f0f7de'); shell.addColorStop(1, '#9bb77c');
  ctx.fillStyle = shell; ctx.beginPath(); ctx.roundRect(-3, 3, 58, 42, 14); ctx.fill();
  roundRect(ctx, 3, 10, 46, 28, 9, '#203b2b');
  if (over) {
    ctx.strokeStyle = '#edc788'; ctx.lineWidth = 2;
    for (const eye of [16, 36]) { ctx.beginPath(); ctx.moveTo(eye - 3, 18); ctx.lineTo(eye + 3, 24); ctx.moveTo(eye + 3, 18); ctx.lineTo(eye - 3, 24); ctx.stroke(); }
  } else {
    roundRect(ctx, 12, 17, 6, 11, 3, '#d7ffad'); roundRect(ctx, 32, 17, 6, 11, 3, '#d7ffad');
  }
  roundRect(ctx, 23, 31, 7, 2, 1, '#bcd993');
  ctx.fillStyle = '#729852'; ctx.beginPath(); ctx.arc(27, 57, 3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

const hash = (n: number) => { const value = Math.sin(n * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };

function drawCity(ctx: CanvasRenderingContext2D, world: RunnerWorld, reduced: boolean) {
  const { width, height, ground } = WORLD;
  const camera = reduced ? 0 : world.distance;
  const time = reduced ? 0 : world.elapsed;
  const sky = ctx.createLinearGradient(0, 0, width * .6, height);
  sky.addColorStop(0, '#111c31'); sky.addColorStop(.55, '#283143'); sky.addColorStop(1, '#47524a');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height);
  const haze = ctx.createRadialGradient(590, 230, 10, 590, 230, 300);
  haze.addColorStop(0, '#bf938619'); haze.addColorStop(1, '#bf938600');
  ctx.fillStyle = haze; ctx.fillRect(0, 0, width, ground);
  for (let i = 0; i < 52; i++) {
    const x = (hash(i + 1) * width - camera * .012 % width + width) % width;
    const y = 22 + hash(i + 102) * 177;
    ctx.globalAlpha = .3 + .4 * (1 + Math.sin(time * .7 + i)) / 2;
    ctx.fillStyle = i % 8 === 0 ? '#ffe9b9' : '#d7e6f3';
    ctx.fillRect(x, y, i % 9 === 0 ? 2 : 1, i % 9 === 0 ? 2 : 1);
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#e8e5d3'; ctx.beginPath(); ctx.arc(627, 65, 17, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#283143'; ctx.beginPath(); ctx.arc(634, 60, 16, 0, Math.PI * 2); ctx.fill();
  // Brief sky details stay well above the playable route.
  const shooting = (time + 3) % 13;
  if (!reduced && shooting < 1.1) {
    const x = 370 + shooting * 260, y = 25 + shooting * 80;
    const trail = ctx.createLinearGradient(x - 85, y - 26, x, y);
    trail.addColorStop(0, '#d7f5ff00'); trail.addColorStop(1, '#e5fcffbb');
    ctx.strokeStyle = trail; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 85, y - 26); ctx.lineTo(x, y); ctx.stroke();
  }
  const flight = (time + 6) % 31;
  if (flight < 15) {
    const x = width + 45 - flight * 60, y = 96 - flight * 1.5;
    ctx.strokeStyle = '#c1cdda28'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 16, y); ctx.lineTo(x + 80, y + 1); ctx.stroke();
    ctx.fillStyle = '#a6b6c2'; ctx.beginPath(); ctx.moveTo(x - 12, y); ctx.lineTo(x + 14, y - 2); ctx.lineTo(x + 20, y - 8); ctx.lineTo(x + 23, y - 8); ctx.lineTo(x + 21, y + 2); ctx.lineTo(x + 6, y + 3); ctx.lineTo(x + 10, y + 11); ctx.lineTo(x + 6, y + 11); ctx.lineTo(x - 2, y + 3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = Math.sin(time * 3) > 0 ? '#ffb6a5' : '#bca59d'; ctx.fillRect(x + 20, y - 8, 2, 2);
  }
  for (const layer of [0, 1]) {
    const spacing = layer ? 87 : 70;
    const offset = camera * (layer ? .22 : .075);
    const first = Math.floor(offset / spacing) - 1;
    for (let index = first; index < first + Math.ceil(width / spacing) + 2; index++) {
      const seed = index + 500 + layer * 1000;
      const x = index * spacing - offset;
      const w = spacing - 7 - hash(seed) * 14;
      const h = (layer ? 64 : 105) + hash(seed + 13) * (layer ? 116 : 92);
      const y = ground - h;
      ctx.fillStyle = layer ? ['#222b34', '#293239', '#1b242e', '#30383d'][Math.floor(hash(seed + 3) * 4)] : '#333d4b';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = layer ? '#465058' : '#424c5a'; ctx.fillRect(x, y, w, 3);
      if (hash(seed + 5) > .6) { ctx.fillStyle = '#29333f'; ctx.fillRect(x + w * .4, y - 9, 15, 9); ctx.fillRect(x + w * .5, y - 21, 2, 13); }
      const gap = layer ? 13 : 12;
      for (let row = 0; row < (h - 16) / gap; row++) {
        for (let col = 0; col < (w - 13) / gap; col++) {
          const lit = hash(seed * 100 + row * 11 + col);
          ctx.fillStyle = lit > .7 ? (layer ? '#d9bb77' : '#8d8670') : lit > .5 ? '#666b63' : layer ? '#131f2b' : '#2a3544';
          ctx.fillRect(x + 8 + col * gap, y + 12 + row * gap, layer ? 5 : 3, layer ? 6 : 4);
        }
      }
    }
  }
  const street = ctx.createLinearGradient(0, ground, 0, height);
  street.addColorStop(0, '#203031'); street.addColorStop(1, '#101c25');
  ctx.fillStyle = street; ctx.fillRect(0, ground, width, height - ground);
  ctx.fillStyle = '#8fb4a1'; ctx.fillRect(0, ground, width, 2);
  ctx.fillStyle = '#426659'; ctx.fillRect(0, ground + 5, width, 1);
  for (let i = 0; i < 18; i++) {
    const x = ((i * 56 - camera) % 1008 + 1008) % 1008;
    ctx.fillStyle = '#668b8039'; ctx.fillRect(x, ground + 21, 20, 2);
    ctx.strokeStyle = '#5a817726'; ctx.beginPath(); ctx.moveTo(x, ground + 44); ctx.lineTo(x + 12, ground + 34); ctx.lineTo(x + 38, ground + 34); ctx.stroke();
  }
}

function drawTask(ctx: CanvasRenderingContext2D, obstacle: TaskObstacle, camera: number) {
  const { y, width: w, height: h, kind } = obstacle;
  const x = obstacle.x - camera;
  if (x > WORLD.width + 60 || x + w < -20) return;
  if (kind === 'SCORTE' && h > 45) {
    // The entire collision silhouette is visible, including the upper boxes.
    for (let row = 0; row < 3; row++) {
      const bx = x + (row === 0 ? 9 : 0), by = y + row * 22;
      const bw = row === 0 ? w - 18 : w;
      roundRect(ctx, bx, by, bw, 22, 3, row % 2 ? '#b59069' : '#d1af81');
      ctx.fillStyle = '#e8cca0'; ctx.fillRect(bx + bw / 2 - 3, by, 6, 22);
      ctx.fillStyle = '#f1e6cc'; ctx.fillRect(bx + 5, by + 8, 10, 8);
    }
    ctx.fillStyle = '#e4d6bf'; ctx.font = '8px monospace'; ctx.fillText('ARRETRATI', x - 1, y + h + 14);
    return;
  }
  const paper = kind === 'PDF'  || kind === 'FATTURA';
  const box = kind === 'PACCO' || kind === 'SCORTE';
  roundRect(ctx, x + 2, y + 3, w, h, 3, '#06111b66');
  roundRect(ctx, x, y, w, h, paper ? 2 : 4, box ? '#bd9569' : kind === 'SCADENZA' ? '#e6d6ca' : '#c8daca');
  ctx.lineWidth = 1.5; ctx.strokeStyle = '#4c6660';
  if (kind === 'MAIL') {
    ctx.beginPath(); ctx.moveTo(x + 3, y + 4); ctx.lineTo(x + w / 2, y + 17); ctx.lineTo(x + w - 3, y + 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 3, y + h - 3); ctx.lineTo(x + 13, y + 16); ctx.moveTo(x + w - 3, y + h - 3); ctx.lineTo(x + w - 13, y + 16); ctx.stroke();
    ctx.fillStyle = '#b76a58'; ctx.beginPath(); ctx.arc(x + w - 2, y + 1, 5, 0, Math.PI * 2); ctx.fill();
  } else if (box) {
    ctx.fillStyle = '#e6c397'; ctx.fillRect(x + w / 2 - 3, y, 6, h);
    ctx.fillStyle = '#ecd9b9'; ctx.fillRect(x + 5, y + 12, 11, 10);
    ctx.fillStyle = '#68523d'; for (let i = 0; i < 4; i++) ctx.fillRect(x + 7 + i * 2, y + 14, 1, 6);
    if (kind === 'SCORTE') { roundRect(ctx, x + 5, y - 10, 22, 12, 2, '#ddc9a4'); ctx.fillStyle = '#f4e5c9'; ctx.fillRect(x + 15, y - 10, 4, 12); }
  } else if (paper) {
    ctx.fillStyle = '#f0ede0'; ctx.fillRect(x + w - 10, y, 10, 9);
    ctx.fillStyle = '#6b8073'; for (let i = 0; i < 3; i++) ctx.fillRect(x + 7, y + 10 + i * 5, i === 2 ? 12 : 19, 1);
    ctx.fillStyle = '#495d51'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center'; ctx.fillText(kind === 'PDF' ? 'PDF' : '€', x + w / 2, y + h - 5); ctx.textAlign = 'left';
  } else {
    ctx.fillStyle = '#b87575'; ctx.fillRect(x, y, w, 9);
    ctx.fillStyle = '#596e63'; for (let i = 0; i < 6; i++) ctx.fillRect(x + 7 + (i % 3) * 8, y + 14 + Math.floor(i / 3) * 7, 3, 3);
  }
  ctx.font = '8px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#d8dfd1';
  ctx.fillText(kind, x + w / 2, y - (kind === 'SCORTE' ? 16 : 7)); ctx.textAlign = 'left';
}

function drawFlyer(ctx: CanvasRenderingContext2D, flyer: Flyer, world: RunnerWorld) {
  const x = flyer.x - world.distance, y = flyer.y;
  if (x > WORLD.width + 80 || x + flyer.width < -30) return;
  const receipt = flyer.kind === 'SCONTRINO';
  // Warm paper and a warning beacon distinguish enemies from distant aircraft.
  ctx.strokeStyle = receipt ? '#ecd5a974' : '#dbbcdf74'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x + 65, y + 9); ctx.lineTo(x + 79, y + 9); ctx.moveTo(x + 68, y + 16); ctx.lineTo(x + 90, y + 16); ctx.stroke();
  ctx.save(); ctx.translate(x, y);
  const flutter = Math.sin(world.elapsed * 10 + flyer.phase) * 3;
  ctx.fillStyle = receipt ? '#f4e4c4' : '#e2c9e5';
  ctx.beginPath(); ctx.moveTo(26, 13); ctx.lineTo(49, 13); ctx.lineTo(50 + flutter, 38);
  for (let i = 5; i >= 0; i--) ctx.lineTo(26 + i * 4 + flutter, 36 + (i % 2) * 3);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = receipt ? '#9d856b' : '#977a9d';
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(31 + flutter * .4, 23 + i * 4); ctx.lineTo(44 + flutter * .5, 23 + i * 4); ctx.stroke(); }
  ctx.fillStyle = receipt ? '#e8c889' : '#c79acd'; ctx.beginPath(); ctx.moveTo(0, 16); ctx.lineTo(59, 0); ctx.lineTo(43, 24); ctx.lineTo(26, 18); ctx.lineTo(20, 29); ctx.closePath(); ctx.fill();
  ctx.fillStyle = receipt ? '#fff0ce' : '#f3e4f5'; ctx.beginPath(); ctx.moveTo(0, 16); ctx.lineTo(59, 0); ctx.lineTo(26, 18); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = receipt ? '#af8a59' : '#916899'; ctx.beginPath(); ctx.moveTo(59, 0); ctx.lineTo(26, 18); ctx.lineTo(20, 29); ctx.stroke();
  ctx.fillStyle = '#c97265'; ctx.beginPath(); ctx.arc(7, 15, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = receipt ? '#f1d5a4' : '#e6c8ec'; ctx.font = '8px monospace'; ctx.textAlign = 'center'; ctx.fillText(flyer.kind, 30, -10); ctx.restore();
}

export function drawWorld(ctx: CanvasRenderingContext2D, world: RunnerWorld, reduced: boolean) {
  drawCity(ctx, world, reduced);
  for (const sign of world.signs) {
    const x = sign.x - world.distance;
    ctx.fillStyle = sign.high ? '#c6b6f6' : '#a8e0d9'; ctx.font = 'bold 10px monospace';
    ctx.fillText(sign.high ? '↑ ↑ DOPPIO SALTO' : '↑ SALI SULLA PIATTAFORMA', x, WORLD.ground + 51);
  }
  for (const hazard of world.hazards) {
    const x = hazard.x - world.distance;
    ctx.fillStyle = '#301e32'; ctx.fillRect(x, WORLD.ground - 1, hazard.width, 14);
    for (let offset = 0; offset < hazard.width; offset += 13) {
      ctx.fillStyle = '#ec9ea1'; ctx.beginPath(); ctx.moveTo(x + offset, WORLD.ground); ctx.lineTo(x + offset + 6, WORLD.ground - 14); ctx.lineTo(x + offset + 12, WORLD.ground); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#763d58'; ctx.fillRect(x + offset + 4, WORLD.ground + 5, 5, 3);
    }
  }
  for (const platform of world.platforms) {
    const x = platform.x - world.distance;
    const high = WORLD.ground - platform.y > 100;
    const color = high ? '#c4a9f2' : '#9ce0d2';
    roundRect(ctx, x, platform.y, platform.width, 14, 4, high ? '#4c4162' : '#365e5a');
    ctx.fillStyle = color; ctx.fillRect(x + 2, platform.y, platform.width - 4, 3);
    ctx.fillStyle = high ? '#a08fb33b' : '#76a79a3b';
    for (let i = 18; i < platform.width - 10; i += 48) ctx.fillRect(x + i, platform.y + 14, 3, WORLD.ground - platform.y - 14);
    ctx.fillStyle = color; ctx.font = '8px monospace'; ctx.fillText(high ? 'MAGAZZINO / LIVELLO 02' : 'MAGAZZINO / LIVELLO 01', x + 14, platform.y + 30);
  }
  for (const obstacle of world.obstacles) drawTask(ctx, obstacle, world.distance);
  for (const flyer of world.flyers) drawFlyer(ctx, flyer, world);
  for (const pickup of world.pickups) {
    const x = pickup.x - world.distance, y = pickup.y + (reduced ? 0 : Math.sin(world.elapsed * 3) * 3);
    ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4);
    ctx.shadowColor = '#bcebad'; ctx.shadowBlur = 15;
    roundRect(ctx, -17, -17, 34, 34, 6, '#d6ffad'); ctx.restore();
    ctx.strokeStyle = '#375541'; ctx.lineWidth = 2.5;
    for (const dy of [-4, 5]) { ctx.beginPath(); ctx.moveTo(x - 6, y + dy + 2); ctx.lineTo(x, y + dy - 4); ctx.lineTo(x + 6, y + dy + 2); ctx.stroke(); }
    ctx.fillStyle = '#d6ffad'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center'; ctx.fillText('RACCOGLI: DOPPIO SALTO', x, y - 39); ctx.textAlign = 'left';
  }
  if (world.flash > 0) {
    ctx.strokeStyle = `rgba(208,247,168,${Math.min(1, world.flash * 2)})`; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(WORLD.playerX + 17, world.feet + 5, 18 + (1 - world.flash) * 12, 5, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#c9f6a2'; for (let i = 0; i < 5; i++) ctx.fillRect(WORLD.playerX - 5 + i * 10, world.feet + 13 + (i % 2) * 8, 2, 3);
  }
  drawOtto(ctx, world);
  ctx.fillStyle = '#ceded6'; ctx.font = '9px monospace';
  ctx.fillText(world.doubleJump ? 'OTTO / OLTRE LA ROUTINE' : world.score >= 500 ? 'OTTO / ROTTA MAGAZZINO' : 'OTTO / LA CITTÀ DEL LAVORO', 20, 24);
}
