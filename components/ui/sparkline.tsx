interface Props {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function Sparkline({ values, color = "#1B4D8E", width = 120, height = 36, className = "" }: Props) {
  if (values.length === 0) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1 || 1);
  const path = values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  const area = `${path} L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg className={className} width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={area} fill={color} fillOpacity="0.10" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={width}
        cy={height - ((values[values.length - 1] - min) / range) * height}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}
