// Mesma lógica de geração de ondas do cartão original (v5 mobile),
// só que roda no servidor — não precisa de JS no cliente pra aparecer.
// Paleta quente (areia / terracota / sálvia), pra combinar com fotos de praia ao entardecer.

const BANDS = [
  "#F6EEDF", "#EFE0C8", "#E8D3AE", "#DEC093", "#D4A96F", "#C6935C", "#B9C9A8", "#E3D6BC",
  "#D9C39F", "#CFAE82", "#C2955F", "#A8BB93", "#EAD9BE", "#E0CBA6", "#D5B489", "#CB9E68",
  "#9FB48C", "#EEE2C9", "#E5D2AF", "#D8BE99",
];

const ACCENT = new Set(["#C6935C", "#B9C9A8", "#C2955F", "#A8BB93", "#9FB48C"]);

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
    const opacidade = ACCENT.has(cor) ? 0.9 * tomAreia : 0.97;
    return <path key={i} d={d} fill={cor} opacity={opacidade} />;
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width={W} height={H} fill="#F3E9DA" />
      {paths}
      <filter id="grain5">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} stitchTiles="stitch" />
      </filter>
      <rect width={W} height={H} filter="url(#grain5)" opacity={0.07} style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}
