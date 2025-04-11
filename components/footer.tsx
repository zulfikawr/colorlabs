interface FooterProps {
  color: string;
}

export default function Footer({ color }: FooterProps) {
  return (
    <footer
      className="max-w-5xl mx-auto px-4 border-t py-6 mt-12 relative z-1"
      style={{ borderColor: color }}
    >
      <div className="text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} ColorLabs. All rights reserved.</p>
        <p className="mt-1">
          Advanced color manipulation tool for designers and developers.
        </p>
      </div>
    </footer>
  );
}
