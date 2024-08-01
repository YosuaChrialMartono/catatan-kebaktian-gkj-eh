import { CatatanKebaktian } from "@/components/catatan-kebaktian/catatan-kebaktian";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-4xl font-bold text-center">Catatan Kebaktian</h1>
        <div className="flex justify-center mt-4">
          <ThemeToggle />
          <Button className="ml-4" asChild>
            <Link href="/buat-catatan">Buat Catatan Kebaktian</Link>
          </Button>
          <Button className="ml-4">Download CSV</Button>
        </div>
      </div>
    </div>
  );
}
