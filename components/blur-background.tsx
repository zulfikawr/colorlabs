interface BlurBackgroundProps {
  color: string;
}

export default function BlurBackground({ color }: BlurBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute top-[5%] right-[10%] w-[35%] h-[35%] rounded-full blur-[200px] opacity-9 transition-colors duration-1000"
        style={{ backgroundColor: color }}
      ></div>

      <div
        className="absolute bottom-[10%] left-[10%] w-[35%] h-[35%] rounded-full blur-[200px] opacity-9 transition-colors duration-1000"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}
