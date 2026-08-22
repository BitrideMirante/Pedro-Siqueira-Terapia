"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    QRCode: any;
  }
}

export function QrCode({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const feito = useRef(false);

  useEffect(() => {
    if (feito.current || !ref.current) return;

    function gerar() {
      if (window.QRCode && ref.current && !ref.current.childNodes.length) {
        new window.QRCode(ref.current, {
          text: url,
          width: 130,
          height: 130,
          colorDark: "#07131C",
          colorLight: "#EDEAE0",
        });
        feito.current = true;
      }
    }

    if (window.QRCode) {
      gerar();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      script.onload = gerar;
      document.body.appendChild(script);
    }
  }, [url]);

  return (
    <div
      ref={ref}
      style={{
        width: 150,
        height: 150,
        background: "#EDEAE0",
        padding: 10,
        borderRadius: 16,
      }}
    />
  );
}
