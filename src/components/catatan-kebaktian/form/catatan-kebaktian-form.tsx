"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { catatanKebaktianFormSchema } from "./schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  jumlahPasalAyatAlkitab,
  kitabAlkitab,
} from "../../../../public/alkitab";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";

export function CatatanKebaktianForm() {
  type formSchema = z.infer<typeof catatanKebaktianFormSchema>;
  const form = useForm<formSchema>({
    resolver: zodResolver(catatanKebaktianFormSchema),
    defaultValues: {
      jenisKebaktian: "",
      tanggalWaktuKebaktian: {
        tanggal: new Date(),
        waktu: "",
      },
      perikopBacaan: {
        kitab: "",
        pasal: "1",
        ayatAwal: "1",
        ayatAkhir: "1",
      },
      temaRenungan: "",
      pelayananKhusus: {
        baptisKudusAnak: 0,
        baptisKudusDewasa: 0,
        mengakuPercaya: 0,
        pemberkatanNikah: {
          namaSaudara: "",
          namaSaudari: "",
        },
      },
      persembahan: {
        melaluiKantong: {
          totalRupiah: 0,
          totalAmplop: 0,
        },
        bulanan: {
          totalRupiah: 0,
        },
        syukur: {
          totalRupiah: 0,
        },
        danaAbadi: {
          totalRupiah: 0,
        },
        kasihPeduli: {
          totalRupiah: 0,
        },
        syukurBaptisSidiNikah: {
          totalRupiah: 0,
          totalAmplop: 0,
        },
        syukurPerjamuanKudus: {
          totalRupiah: 0,
          totalAmplop: 0,
        },
        perorangan: {
          totalRupiah: 0,
        },
        pembangunan: {
          totalRupiah: 0,
        },
        khusus: {
          totalRupiah: 0,
        },
        lainnya: {
          totalRupiah: 0,
        },
      },
      kehadiranJemaat: {
        kebaktianUmum: {
          pria: 0,
          wanita: 0,
        },
        kebaktianPemuda: {
          pria: 0,
          wanita: 0,
        },
        kebaktianRemaja: {
          pria: 0,
          wanita: 0,
        },
        kebaktianAnak: {
          pria: 0,
          wanita: 0,
        },
      },
      pesertaPerjamuanKudus: 0,
      majelis: [],
      picIbadah: "",
      organis: "",
      prokantor: "",
      operator: "",
      createdDate: new Date(),
      majelisPembuat: "",
      evaluasiHalBaik: "",
      evaluasiPerluPerbaikan: "",
    },
  });

  function onSubmit(values: formSchema) {
    console.log(values);
  }

  const [formMajelisCount, setFormMajelisCount] = useState(1);

  const handleAddMajelisForm = () => {
    setFormMajelisCount(formMajelisCount + 1);
  };

  interface MajelisFormInterface {
    nama: string;
    tugas: string;
  }

  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToDiv = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteMajelisForm = (indexToDelete: number) => {
    console.log(indexToDelete);
    if (formMajelisCount > 1) {
      setFormMajelisCount(formMajelisCount - 1);
      const majelisFormArray = form.getValues()
        .majelis as MajelisFormInterface[];
      if (majelisFormArray) {
        const updatedMajelisForm = majelisFormArray.filter(
          (_, index) => index !== indexToDelete
        );
        form.setValue("majelis", updatedMajelisForm);
        console.log(updatedMajelisForm);
      }
    }
    scrollToDiv();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="jenisKebaktian"
          render={({ field }) => (
            <div>
              <FormLabel>Jenis Kebaktian</FormLabel>
              <Input {...field} />
              <FormDescription>
                Contoh: Kebaktian Umum, Kebaktian Pemuda, Kebaktian Remaja,
                Kebaktian Anak
              </FormDescription>
              <FormMessage />
            </div>
          )}
        />

        <div id="tanggal-waktu-kebaktian" className="w-full flex gap-3">
          <FormField
            control={form.control}
            name="tanggalWaktuKebaktian.tanggal"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Kebaktian</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Contoh: 1 Agustus 2024</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tanggalWaktuKebaktian.waktu"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Waktu Kebaktian</FormLabel>
                <Input {...field} type="time" />
                <FormDescription>Contoh: 07:00</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div id="perikop-bacaan" className="w-full flex gap-3">
          <FormField
            control={form.control}
            name="perikopBacaan.kitab"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perikop Bacaan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih sebuah Kitab" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kitabAlkitab.slice(0, 30).map((kitab) => (
                      <SelectItem key={kitab} value={kitab}>
                        {kitab}
                      </SelectItem>
                    ))}
                    <SelectSeparator />
                  </SelectContent>
                </Select>
                <FormDescription>Contoh: Yohanes 3:16</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="perikopBacaan.pasal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pasal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={form.watch("perikopBacaan.kitab") === ""}
                    >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({
                      length:
                        jumlahPasalAyatAlkitab[
                          form.watch("perikopBacaan.kitab")
                            ? kitabAlkitab.indexOf(
                                form.watch("perikopBacaan.kitab")
                              )
                            : 0
                        ]?.jumlahPasal,
                    }).map((_, index) => (
                      <SelectItem key={index + 1} value={`${index + 1}`}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Contoh: 3</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="perikopBacaan.ayatAwal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ayat Awal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={
                        form.watch("perikopBacaan.kitab") === "" ||
                        form.watch("perikopBacaan.pasal") === ""
                      }
                    >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({
                      length:
                        jumlahPasalAyatAlkitab[
                          form.watch("perikopBacaan.kitab")
                            ? kitabAlkitab.indexOf(
                                form.watch("perikopBacaan.kitab")
                              )
                            : 0
                        ]?.jumlahAyat[
                          parseInt(form.watch("perikopBacaan.pasal")) - 1
                        ],
                    }).map((_, index) => (
                      <SelectItem key={index + 1} value={`${index + 1}`}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Contoh: 3</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="perikopBacaan.ayatAkhir"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ayat Akhir</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={
                        form.watch("perikopBacaan.kitab") === "" ||
                        form.watch("perikopBacaan.pasal") === ""
                      }
                    >
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({
                      length:
                        jumlahPasalAyatAlkitab[
                          form.watch("perikopBacaan.kitab")
                            ? kitabAlkitab.indexOf(
                                form.watch("perikopBacaan.kitab")
                              )
                            : 0
                        ]?.jumlahAyat[
                          parseInt(form.watch("perikopBacaan.pasal")) - 1
                        ] - parseInt(form.watch("perikopBacaan.ayatAwal")),
                    }).map((_, index) => (
                      <SelectItem
                        key={index + 1}
                        value={`${
                          index +
                          1 +
                          parseInt(form.watch("perikopBacaan.ayatAwal")) -
                          1
                        }`}
                      >
                        {index +
                          1 +
                          parseInt(form.watch("perikopBacaan.ayatAwal")) -
                          1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Contoh: 3</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="temaRenungan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tema Renungan</FormLabel>
              <Input {...field} />
              <FormDescription>Contoh: Kasih Allah</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />

        <div id="pelayanan-khusus" className="flex flex-col gap-4">
          <span className="font-extrabold text-xl">Pelayanan Khusus</span>
          <FormField
            control={form.control}
            name="pelayananKhusus.baptisKudusAnak"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baptis Kudus Anak</FormLabel>
                <FormControl>
                  <div className="flex gap-3 items-center">
                    <Input
                      {...field}
                      value={field.value as number}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                      min={0}
                      type="number"
                    />
                    <span>Orang</span>
                  </div>
                </FormControl>
                <FormDescription>Contoh: 3</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pelayananKhusus.baptisKudusDewasa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baptis Kudus Dewasa</FormLabel>
                <FormControl>
                  <div className="flex gap-3 items-center">
                    <Input
                      {...field}
                      value={field.value as number}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                      min={0}
                      type="number"
                    />
                    <span>Orang</span>
                  </div>
                </FormControl>
                <FormDescription>Contoh: 3</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pelayananKhusus.mengakuPercaya"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mengaku Percaya (Sidi)</FormLabel>
                <FormControl>
                  <div className="flex gap-3 items-center">
                    <Input
                      {...field}
                      value={field.value as number}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                      min={0}
                      type="number"
                    />
                    <span>Orang</span>
                  </div>
                </FormControl>
                <FormDescription>Contoh: 3</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <span>Pemberkatan Nikah</span>
            <div id="pemberkatan-nikah" className="flex gap-2">
              <FormField
                control={form.control}
                name="pelayananKhusus.pemberkatanNikah.namaSaudara"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Saudara</FormLabel>
                    <Input {...field} value={field.value as string} />
                    <FormDescription>Contoh: John Doe</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pelayananKhusus.pemberkatanNikah.namaSaudari"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Saudari</FormLabel>
                    <Input {...field} value={field.value as string} />
                    <FormDescription>Contoh: John Doe</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div id="persembahan" className="flex flex-col gap-4">
          <span className="font-extrabold text-xl">Persembahan</span>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="persembahan.melaluiKantong.totalRupiah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Melalui Kantong (Rp)</FormLabel>
                  <Input
                    {...field}
                    value={field.value as number}
                    type="number"
                    min={0}
                  />
                  <FormDescription>Contoh: 100000</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="persembahan.melaluiKantong.totalAmplop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Amplop</FormLabel>
                  <Input
                    {...field}
                    value={field.value as number}
                    type="number"
                    min={0}
                  />
                  <FormDescription>Contoh: 10</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="persembahan.bulanan.totalRupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bulanan (Rp)</FormLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={0}
                />
                <FormDescription>Contoh: 100000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="persembahan.syukur.totalRupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Syukur (Rp)</FormLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={0}
                />
                <FormDescription>Contoh: 100000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="persembahan.danaAbadi.totalRupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dana Abadi (Rp)</FormLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={0}
                />
                <FormDescription>Contoh: 100000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="persembahan.kasihPeduli.totalRupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kasih Peduli (Rp)</FormLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={0}
                />
                <FormDescription>Contoh: 100000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="persembahan.syukurBaptisSidiNikah.totalRupiah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syukur Baptis/Sidi/Nikah (Rp)</FormLabel>
                  <Input
                    {...field}
                    value={field.value as number}
                    type="number"
                    min={0}
                  />
                  <FormDescription>Contoh: 100000</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="persembahan.syukurBaptisSidiNikah.totalAmplop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Amplop</FormLabel>
                  <Input
                    {...field}
                    value={field.value as number}
                    type="number"
                    min={0}
                  />
                  <FormDescription>Contoh: 10</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="persembahan.syukurPerjamuanKudus.totalRupiah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syukur Perjamuan Kudus(Rp)</FormLabel>
                  <Input
                    {...field}
                    value={field.value as number}
                    type="number"
                    min={0}
                  />
                  <FormDescription>Contoh: 100000</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="persembahan.syukurPerjamuanKudus.totalAmplop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Amplop</FormLabel>
                  <Input
                    {...field}
                    value={field.value as number}
                    type="number"
                    min={0}
                  />
                  <FormDescription>Contoh: 10</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="persembahan.perorangan.totalRupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perorangan (Rp)</FormLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={0}
                />
                <FormDescription>Contoh: 100000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="persembahan.pembangunan.totalRupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pembangunan (Rp)</FormLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={0}
                />
                <FormDescription>Contoh: 100000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="persembahan.khusus.totalRupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khusus (Rp)</FormLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={0}
                />
                <FormDescription>Contoh: 100000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="persembahan.lainnya.totalRupiah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lain-Lain (Rp)</FormLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  type="number"
                  min={0}
                />
                <FormDescription>Contoh: 100000</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col">
            <span className="text-xl font-extrabold">Jumlah Persembahan</span>
            <span className="text-xl font-extrabold">
              Rp
              {new Intl.NumberFormat().format(
                Object.values(form.watch("persembahan")).reduce((acc, curr) => {
                  return acc + (curr.totalRupiah ? +curr.totalRupiah : 0);
                }, 0)
              )}
            </span>
          </div>
        </div>

        <Separator />

        <div id="kehadiran-jemaat" className="flex flex-col w-fit gap-4">
          <span className="font-extrabold text-xl">Kehadiran Jemaat</span>
          {[
            ["kebaktianUmum", "Kebaktian Umum"],
            ["kebaktianPemuda", "Kebaktian Pemuda"],
            ["kebaktianRemaja", "Kebaktian Remaja"],
            ["kebaktianAnak", "Kebaktian Anak"],
          ].map((kebaktian, index) => (
            <div className="flex items-center gap-4" key={kebaktian[0]}>
              <span className="w-20 lg:w-40">{kebaktian[1]}</span>
              <FormField
                control={form.control}
                name={
                  `kehadiranJemaat.${kebaktian[0]}.pria` as keyof formSchema
                }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pria</FormLabel>
                    <Input
                      {...field}
                      value={field.value as number}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                      min={0}
                      type="number"
                    />
                    <FormDescription>Contoh: 10</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={
                  `kehadiranJemaat.${kebaktian[0]}.wanita` as keyof formSchema
                }
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wanita</FormLabel>
                    <Input
                      {...field}
                      value={field.value as number}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                      min={0}
                      type="number"
                    />
                    <FormDescription>Contoh: 10</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <div className="flex items-center gap-4">
            <span className="w-20 lg:w-40">Total Jemaat</span>
            <div className="flex flex-grow gap-4">
              <div className="flex flex-col w-full">
                <span>Pria</span>
                <span className="w-20 lg:w-40">
                  {Object.values(form.watch("kehadiranJemaat")).reduce(
                    (acc, curr) => {
                      return acc + curr.pria;
                    },
                    0
                  )}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <span>Wanita</span>

                <span className="w-20 lg:w-40">
                  {Object.values(form.watch("kehadiranJemaat")).reduce(
                    (acc, curr) => {
                      return acc + curr.wanita;
                    },
                    0
                  )}
                </span>
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="pesertaPerjamuanKudus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peserta Perjamuan Kudus</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value as number}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                    min={0}
                    type="number"
                  />
                </FormControl>
                <FormDescription>Contoh: 10</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div ref={targetRef} id="majelis" className="flex flex-col gap-4">
          <span className="font-extrabold text-xl">
            Anggota Majelis yang Hadir
          </span>
          {Array.from({ length: formMajelisCount }).map((_, index) => (
            <div className="flex gap-4" key={index}>
              <FormField
                control={form.control}
                name={`majelis.${index}.nama`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Contoh: John Doe</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`majelis.${index}.tugas`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Tugas</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Contoh: Pengakuan Iman Rasuli
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {formMajelisCount > 1 && (
                <div className="flex flex-col gap-2">
                  <span>Action</span>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteMajelisForm(index)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAddMajelisForm()}
            >
              Tambah
            </Button>
          </div>
        </div>

        <div id="form-action-button" className="flex gap-3">
          <Button type="submit">Submit</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="">Cancel</Button>
            </DialogTrigger>
            <DialogContent>
              <h1>Are you sure?</h1>
              <p>Are you sure you want to cancel?</p>
              <DialogClose asChild>
                <Button className="mr-2">Cancel</Button>
              </DialogClose>
              <Button asChild>
                <Link href={"/"}>Yes</Link>
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
}
