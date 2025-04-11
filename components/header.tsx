import { motion } from "framer-motion";
import { Github } from "lucide-react";

interface HeaderProps {
  color: string;
}

export default function Header({ color }: HeaderProps) {
  return (
    <header
      className="top-0 z-10 backdrop-blur-md bg-transparent border-b max-w-5xl mx-auto px-4 py-4"
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div
            className="w-6 h-6 rounded-full mr-2 transition-colors duration-1000"
            style={{ backgroundColor: color }}
          ></div>
          <h1 className="text-xl font-bold tracking-tight">ColorLabs</h1>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          href="https://github.com/zulfikawr/colorlabs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Github className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">View on GitHub</span>
        </motion.a>
      </div>
    </header>
  );
}
