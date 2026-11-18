import { useEffect, useState } from "react";
import { nextBootcamp } from "@/lib/bootcamp";

export function Countdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(nextBootcamp().getTime() - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (left === null) return <span className="font-mono">--:--:--</span>;
  const s = Math.max(0, Math.floor(left / 1000));
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return <span className="font-mono font-bold tabular-nums">{d > 0 ? `${d}d ` : ""}{pad(h)}:{pad(m)}:{pad(sec)}</span>;
}
