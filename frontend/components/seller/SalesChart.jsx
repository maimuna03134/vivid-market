"use client";

const WIDTH = 1000;
const HEIGHT = 300;

// values -> an SVG path, scaled so the largest value in either series sits near the top
function buildPath(values, max) {
  if (values.length < 2) return "";
  const step = WIDTH / (values.length - 1);
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(HEIGHT - (v / max) * HEIGHT).toFixed(1)}`)
    .join(" ");
}

// current/previous = arrays of numbers (same length), xLabels = labels shown under the chart
export default function SalesChart({ current, previous, xLabels }) {
  const max = Math.max(...current, ...previous, 1) * 1.15;
  const linePath = buildPath(current, max);
  const prevPath = buildPath(previous, max);
  const areaPath = `${linePath} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;
  const lastY = HEIGHT - (current[current.length - 1] / max) * HEIGHT;

  return (
    <div className="p-6 h-[320px] relative">
      <svg className="w-full h-full drop-shadow-lg overflow-visible" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <defs>
          <linearGradient id="sellerChartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 100, 200, 300].map((y) => (
          <line key={y} x1="0" x2={WIDTH} y1={y} y2={y} stroke="#e1e3e4" strokeDasharray="4" />
        ))}
        <path d={prevPath} fill="none" stroke="#e1e3e4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d={areaPath} fill="url(#sellerChartFill)" />
        <path d={linePath} fill="none" stroke="#ff6b35" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={WIDTH} cy={lastY} r="6" fill="#ff6b35" stroke="white" strokeWidth="2" />
      </svg>
      <div className="flex justify-between mt-4 text-label-md text-on-surface-variant px-2">
        {xLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}