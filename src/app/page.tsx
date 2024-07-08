import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ThemeToggle />
    </div>
  );
}
