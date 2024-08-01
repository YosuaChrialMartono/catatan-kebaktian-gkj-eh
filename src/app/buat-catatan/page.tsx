import { CatatanKebaktian } from "@/components/catatan-kebaktian/catatan-kebaktian";

export default function Page() {
  const cancelForm = () => {};
  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <CatatanKebaktian />
    </div>
  );
}
