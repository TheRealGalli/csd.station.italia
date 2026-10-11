// World coordinates keep collisions independent of display size and frame rate.
export const WORLD = { width: 760, height: 400, ground: 330, playerX: 100, playerWidth: 34, playerHeight: 50 };
export const PHYSICS = { gravity: 1400, jumpSpeed: 520 };
export type TaskKind = 'MAIL' | 'PDF' | 'FATTURA' | 'SCADENZA' | 'SCORTE' | 'PACCO';
export type TaskObstacle = { x: number; y: number; width: number; height: number; kind: TaskKind };
export type Flyer = { anchorX: number; x: number; y: number; baseY: number; width: number; height: number; phase: number; kind: 'SCONTRINO' | 'SOLLECITO' };
export type Platform = { x: number; y: number; width: number };
export type Hazard = { x: number; width: number };
export type Pickup = { x: number; y: number };
export type RouteSign = { x: number; high: boolean };
export type RunnerWorld = {
  distance: number; elapsed: number; feet: number; velocity: number; grounded: boolean;
  jumps: number; doubleJump: boolean; over: boolean; score: number; nextChunk: number; chunk: number; taskCount: number;
  jumpBuffer: number; coyote: number; flash: number; jumpSerial: number;
  flyers: Flyer[]; obstacles: TaskObstacle[]; platforms: Platform[]; hazards: Hazard[]; pickups: Pickup[]; signs: RouteSign[];
};

export function createWorld(): RunnerWorld {
  return { distance: 0, elapsed: 0, feet: WORLD.ground, velocity: 0, grounded: true, jumps: 0,
    doubleJump: false, over: false, score: 0, nextChunk: 660, chunk: 0, taskCount: 0, jumpBuffer: 0, coyote: .08, flash: 0, jumpSerial: 0,
    flyers: [], obstacles: [], platforms: [], hazards: [], pickups: [], signs: [] };
}

export function requestJump(world: RunnerWorld) {
  if (world.over) return;
  if (world.grounded || world.coyote > 0 || (world.doubleJump && world.jumps < 2)) {
    // Walking off a ledge consumes the ground jump after the short grace window.
    world.jumps = world.grounded || world.coyote > 0 ? 1 : world.jumps + 1;
    world.velocity = -PHYSICS.jumpSpeed;
    world.jumpSerial++;
    world.grounded = false;
    world.coyote = 0;
    world.jumpBuffer = 0;
    if (world.jumps === 2) world.flash = .3;
  } else world.jumpBuffer = .11;
}

// Authored route dimensions preserve landing/reaction space as speed increases.
export function addPlatformRoute(world: RunnerWorld, x: number, high: boolean) {
  const width = high ? 470 : 340;
  const y = WORLD.ground - (high ? 150 : 62);
  world.platforms.push({ x, y, width });
  world.hazards.push({ x: x + (high ? 75 : 55), width: high ? 320 : 220 });
  world.obstacles.push({ x: x + (high ? 365 : 250), y: y - 29, width: 33, height: 29, kind: 'PACCO' });
  world.signs.push({ x: x - 155, high });
  return width;
}

// Flyers patrol a known corridor above a stack: no surprise dives into a landing.
export function addFlightRoute(world: RunnerWorld, x: number) {
  const phase = world.chunk * 1.7;
  world.obstacles.push({ x, y: WORLD.ground - 66, width: 59, height: 66, kind: 'SCORTE' });
  world.flyers.push({ anchorX: x + 4, x: x + 4 + Math.sin(phase) * 22, y: 211 + Math.sin(phase) * 6,
    baseY: 211, width: 59, height: 39, phase, kind: world.chunk % 2 ? 'SCONTRINO' : 'SOLLECITO' });
  world.signs.push({ x: x - 190, high: true });
  return 820;
}

function populate(world: RunnerWorld) {
  const kinds: TaskKind[] = ['MAIL', 'PDF', 'FATTURA', 'SCADENZA', 'SCORTE', 'PACCO'];
  while (world.nextChunk < world.distance + WORLD.width + 400) {
    const x = world.nextChunk;
    const arrivalScore = (x - WORLD.playerX) / 5;
    if (arrivalScore >= 2000 && !world.doubleJump && world.pickups.length === 0) {
      // A clear stretch around the pickup lets the player collect it on the ground.
      // If missed while jumping, offer it again; high routes remain locked.
      world.pickups.push({ x: x + 80, y: WORLD.ground - 30 });
      world.nextChunk += 700;
    } else if (world.doubleJump && world.chunk % 3 === 2) {
      world.nextChunk += addFlightRoute(world, x);
    } else if (arrivalScore >= 500 && world.chunk % 3 !== 2) {
      const high = world.doubleJump && world.chunk % 3 === 0;
      world.nextChunk += addPlatformRoute(world, x, high) + 480;
    } else {
      const kind = kinds[world.taskCount++ % kinds.length];
      const height = kind === 'PDF' || kind === 'FATTURA' ? 39 : 30;
      world.obstacles.push({ x, y: WORLD.ground - height, width: kind === 'MAIL' ? 43 : 35, height, kind });
      world.nextChunk += 490 + (world.chunk % 3) * 45;
    }
    world.chunk++;
  }
}

export function stepWorld(world: RunnerWorld, delta: number) {
  if (world.over) return;
  // Small physics steps avoid tunnelling through the top of a platform.
  let remaining = Math.min(delta, .05);
  populate(world);
  while (remaining > 0 && !world.over) {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    world.elapsed += dt;
    world.distance += Math.min(225 + world.score * .018, 295) * dt;
    world.score = Math.floor(world.distance / 5);
    world.flash = Math.max(0, world.flash - dt);
    world.jumpBuffer = Math.max(0, world.jumpBuffer - dt);
    world.coyote = Math.max(0, world.coyote - dt);
    for (const flyer of world.flyers) {
      flyer.x = flyer.anchorX + Math.sin(world.elapsed * 2.2 + flyer.phase) * 22;
      flyer.y = flyer.baseY + Math.sin(world.elapsed * 2.8 + flyer.phase) * 6;
    }
    const previousFeet = world.feet;
    const wasGrounded = world.grounded;
    world.velocity += PHYSICS.gravity * dt;
    world.feet += world.velocity * dt;
    world.grounded = false;
    const left = world.distance + WORLD.playerX + 5;
    const right = left + WORLD.playerWidth - 10;
    let landing = WORLD.ground;
    if (world.velocity >= 0) {
      for (const platform of world.platforms) {
        if (right > platform.x && left < platform.x + platform.width && previousFeet <= platform.y + .5 && world.feet >= platform.y) landing = Math.min(landing, platform.y);
      }
      if (world.feet >= landing) {
        world.feet = landing; world.velocity = 0; world.grounded = true; world.jumps = 0; world.coyote = .08;
      }
    }
    if (wasGrounded && !world.grounded && world.jumps === 0) world.coyote = .08;
    if (!world.grounded && world.coyote === 0 && world.jumps === 0) world.jumps = 1;

    for (const pickup of world.pickups) {
      if (right > pickup.x - 20 && left < pickup.x + 20 && world.feet > pickup.y - 20 && world.feet - WORLD.playerHeight < pickup.y + 20) {
        world.doubleJump = true; world.flash = .7;
      }
    }
    if (world.doubleJump) world.pickups = [];
    world.over = world.hazards.some(h => right > h.x + 3 && left < h.x + h.width - 3 && world.feet > WORLD.ground - 12)
      || world.flyers.some(f => right > f.x + 7 && left < f.x + f.width - 7 && world.feet - 3 > f.y + 5 && world.feet - WORLD.playerHeight + 5 < f.y + f.height - 6)
      || world.obstacles.some(o => right > o.x + 3 && left < o.x + o.width - 3 && world.feet - 3 > o.y + 3 && world.feet - WORLD.playerHeight + 5 < o.y + o.height - 3);
    if (world.grounded && world.jumpBuffer > 0 && !world.over) requestJump(world);
  }
  const behind = world.distance - 80;
  world.flyers = world.flyers.filter(f => f.anchorX + f.width + 22 > behind);
  world.obstacles = world.obstacles.filter(o => o.x + o.width > behind);
  world.platforms = world.platforms.filter(p => p.x + p.width > behind);
  world.hazards = world.hazards.filter(h => h.x + h.width > behind);
  world.pickups = world.pickups.filter(p => p.x > world.distance + WORLD.playerX - 45);
  world.signs = world.signs.filter(s => s.x > behind);
}
