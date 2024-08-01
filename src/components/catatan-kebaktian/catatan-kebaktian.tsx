"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { CatatanKebaktianForm } from "./form/catatan-kebaktian-form";

export function CatatanKebaktian() {
  return (
    <div className="w-full px-2">
      <span className="font-extrabold text-xl">Buat Catatan</span>
      <CatatanKebaktianForm />
    </div>
  );
}
