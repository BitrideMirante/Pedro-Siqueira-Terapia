// Mesma lógica de geração de ondas do cartão original (v5 mobile),
// só que roda no servidor — não precisa de JS no cliente pra aparecer.

const BANDS = [
  "#0A1524", "#123A4E", "#14705F", "#2FB394", "#C9A07A", "#0D2033", "#1B5F7C", "#25997F",
  "#4ECBAA", "#B5734F", "#0A1B2B", "#16506A", "#1E8770", "#D8BE99", "#3FC0A0", "#0C2233",
  "#1A6C88", "#A9603F", "#2AA98C", "#57D7B6",
];

const WARM = new Set(["#C9A07A", "#B5734F", "#D8BE99", "#A9603F"]);

export function Waves({
  intensidade = 1,
  tomAreia = 1,
}: {
  intensidade?: number;
  tomAreia?: number;
}) {
  const W = 1000, H = 1400, N = BANDS.length, step = (H + 220) / N;

  const paths = BANDS.map((cor, i) => {
    const base = -110 + i * step;
    const a = (18 + (i % 4) * 8) * intensidade;
    const w1 = 205 + (i % 5) * 42, w2 = 95 + (i % 3) * 29, ph = i * 1.73;
    let d = "";
    for (let x = 0; x <= W; x += 20) {
      const y = base + Math.sin(x / w1 + ph) * a + Math.cos(x / w2 + ph * 0.6) * a * 0.35;
      d += (x === 0 ? "M0," : ` L${x},`) + y.toFixed(1);
    }
    d += ` L${W},${H} L0,${H} Z`;
    const opacidade = WARM.has(cor) ? 0.97 * tomAreia : 0.97;
    return <path key={i} d={d} fill={cor} opacity={opacidade} />;
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width={W} height={H} fill="#07131C" />
      {paths}
      <filter id="grain5">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} stitchTiles="stitch" />
      </filter>
      <rect width={W} height={H} filter="url(#grain5)" opacity={0.14} style={{ mixBlendMode: "overlay" }} />
    </svg>
  );
}
