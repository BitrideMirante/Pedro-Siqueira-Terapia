type ItemGaleria = {
  tipo: "video" | "foto";
  src: string;
  poster?: string;
  legenda: string;
};

const ITENS: ItemGaleria[] = [
  { tipo: "video", src: "/galeria/atendimento-rio-1.mp4", poster: "/galeria/poster-1.jpg", legenda: "Rolante · RS" },
  { tipo: "foto", src: "/galeria/atendimento-foto-1.jpg", legenda: "Rolante · RS" },
  { tipo: "video", src: "/galeria/atendimento-rio-2.mp4", poster: "/galeria/poster-2.jpg", legenda: "Rolante · RS" },
  { tipo: "video", src: "/galeria/atendimento-rio-3.mp4", poster: "/galeria/poster-3.jpg", legenda: "Consultório Alba" },
];

export function Galeria() {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        overflowX: "auto",
        overflowY: "hidden",
        scrollSnapType: "x proximity",
        WebkitOverflowScrolling: "touch",
        paddingBottom: 6,
        marginLeft: -18,
        marginRight: -18,
        paddingLeft: 18,
        paddingRight: 18,
      }}
      className="galeria-scroll"
    >
      {ITENS.map((item, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            flex: "0 0 auto",
            width: 168,
            height: 262,
            borderRadius: 20,
            overflow: "hidden",
            scrollSnapAlign: "start",
            border: "1px solid rgba(61,46,34,.18)",
            background: "#E8D3AE",
          }}
        >
          {item.tipo === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.legenda}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "20px 12px 10px",
              background: "linear-gradient(180deg, rgba(61,46,34,0) 0%, rgba(61,46,34,.75) 100%)",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono',monospace",
                fontSize: 9.5,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "#FBF3E7",
              }}
            >
              {item.legenda}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
