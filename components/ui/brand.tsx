import Image from "next/image";

interface Props {
  height?: number;
  /** Wrap dans une pill blanche pour les fonds sombres. */
  pill?: boolean;
  className?: string;
}

const RATIO = 1858 / 983; // dimensions natives du logo

export function Brand({ height = 36, pill = false, className = "" }: Props) {
  const width = Math.round(height * RATIO);
  const img = (
    <Image
      src="/logo.png"
      alt="TradeFlow Africa"
      width={width}
      height={height}
      priority
      className="block h-auto w-auto"
      style={{ height, width: "auto" }}
    />
  );
  if (!pill) return <span className={`inline-flex items-center ${className}`}>{img}</span>;
  return (
    <span
      className={`inline-flex items-center bg-white rounded-md px-2 py-1 shadow-sm ${className}`}
    >
      {img}
    </span>
  );
}
