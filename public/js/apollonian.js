/* =========================
   FONDO APOLLONIAN / MICELIAL
========================= */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Circle {
  constructor(x, y, r, k) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.k = k;
  }
}

function key(c) {
  return `${c.x.toFixed(5)},${c.y.toFixed(5)},${c.r.toFixed(5)}`;
}

function descartesReplace(circles, index) {
  const old = circles[index];
  const others = circles.filter((_, i) => i !== index);

  const kSum = others[0].k + others[1].k + others[2].k;
  const newK = 2 * kSum - old.k;

  const bxSum =
    others[0].k * others[0].x +
    others[1].k * others[1].x +
    others[2].k * others[2].x;

  const bySum =
    others[0].k * others[0].y +
    others[1].k * others[1].y +
    others[2].k * others[2].y;

  const oldBx = old.k * old.x;
  const oldBy = old.k * old.y;

  const newBx = 2 * bxSum - oldBx;
  const newBy = 2 * bySum - oldBy;

  const x = newBx / newK;
  const y = newBy / newK;
  const r = Math.abs(1 / newK);

  return new Circle(x, y, r, newK);
}

function generateApollonian(depth = 8, minRadius = 0.004) {
  const circles = [];
  const seen = new Set();

  const outer = new Circle(0, 0, 1, -1);

  const r = Math.sqrt(3) / (2 + Math.sqrt(3));
  const d = 1 - r;

  const c1 = new Circle(0, -d, r, 1 / r);

  const c2 = new Circle(
    Math.cos(Math.PI / 6) * d,
    Math.sin(Math.PI / 6) * d,
    r,
    1 / r
  );

  const c3 = new Circle(
    Math.cos(5 * Math.PI / 6) * d,
    Math.sin(5 * Math.PI / 6) * d,
    r,
    1 / r
  );

  const start = [outer, c1, c2, c3];

  function addCircle(c) {
    if (c.r < minRadius) return;

    const id = key(c);

    if (!seen.has(id)) {
      seen.add(id);
      circles.push(c);
    }
  }

  start.forEach(addCircle);

  const queue = [{ set: start, depth: 0 }];

  while (queue.length > 0) {
    const item = queue.shift();

    if (item.depth >= depth) continue;

    for (let i = 0; i < 4; i++) {
      const next = descartesReplace(item.set, i);

      if (
        !Number.isFinite(next.x) ||
        !Number.isFinite(next.y) ||
        !Number.isFinite(next.r)
      ) {
        continue;
      }

      if (next.r < minRadius) continue;

      addCircle(next);

      const newSet = [...item.set];
      newSet[i] = next;

      queue.push({
        set: newSet,
        depth: item.depth + 1
      });
    }
  }

  return circles;
}

const gasket = generateApollonian(8, 0.004);
const clickGaskets = [];

window.addEventListener("click", function(e) {
  clickGaskets.push({
    x: e.clientX,
    y: e.clientY,
    birth: Date.now() * 0.001
  });
});

function drawCircle(x, y, r, opacity = 0.8) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);

  ctx.strokeStyle = `rgba(255, 127, 17, ${opacity})`;
  ctx.lineWidth = 1;

  ctx.stroke();
}

function drawGasket(cx, cy, scale, opacity) {
  for (const c of gasket) {
    const x = cx + c.x * scale;
    const y = cy + c.y * scale;
    const r = c.r * scale;

    if (r < 1) continue;

    drawCircle(x, y, r, opacity);
  }
}

function drawInfiniteTunnel(cx, cy) {
  const screenSize = Math.min(canvas.width, canvas.height);

  const minScale = screenSize * 0.1;
  const time = Date.now() * 0.000018;

  const innerRatio = 0.21;
  const travel = time;
  const offset = travel % 1;

  for (let i = -2; i < 9; i++) {
    const step = i + offset;

    const scale = minScale * Math.pow(1 / innerRatio, step);

    if (scale < 3) continue;

    const diameter = scale * 2;

    let opacity = 0.22;

    if (scale < minScale * 1.4) {
      opacity *= scale / (minScale * 1.4);
    }

    if (diameter > screenSize * 1.8) {
      opacity *= Math.max(
        0,
        1 - (diameter - screenSize * 1.8) / screenSize
      );
    }

    if (opacity <= 0) continue;

    drawGasket(cx, cy, scale, opacity);
  }
}

function drawClickGaskets() {
  const now = Date.now() * 0.001;

  for (const g of clickGaskets) {
    const age = now - g.birth;

    const scale = 80 + age * 180;
    const opacity = Math.max(0, 0.35 - age * 0.08);

    drawGasket(g.x, g.y, scale, opacity);
  }

  for (let i = clickGaskets.length - 1; i >= 0; i--) {
    const age = now - clickGaskets[i].birth;

    if (age > 4) {
      clickGaskets.splice(i, 1);
    }
  }
}

function animateApollonian() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  drawInfiniteTunnel(cx, cy);
  drawClickGaskets();

  requestAnimationFrame(animateApollonian);
}

animateApollonian();