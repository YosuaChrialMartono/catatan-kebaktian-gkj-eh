import { z } from 'zod'

const pemberkatanNikahFormSchema = z.object({
    namaSaudara: z.string().nullable(),
    namaSaudari: z.string().nullable(),
}).refine(data => {
    const fields = [data.namaSaudara, data.namaSaudari]
    const filledFields = fields.filter(field => field !== undefined && field !== "")
    return filledFields.length === 0 || filledFields.length == fields.length
},
    {
        message: "Nama kedua mempelai harus ada atau tidak ada sama sekali"
    })

const persembahanFormSchema = z.object({
    melaluiKantong: z.object({
        totalRupiah: z.number().nullable(),
        totalAmplop: z.number().nullable(),
    }),
    bulanan: z.object({
        totalRupiah: z.number().nullable(),
    }),
    syukur: z.object({
        totalRupiah: z.number().nullable(),
    }),
    danaAbadi: z.object({
        totalRupiah: z.number().nullable(),
    }),
    kasihPeduli: z.object({
        totalRupiah: z.number().nullable(),
    }),
    syukurBaptisSidiNikah: z.object({
        totalRupiah: z.number().nullable(),
        totalAmplop: z.number().nullable(),
    }),
    syukurPerjamuanKudus: z.object({
        totalRupiah: z.number().nullable(),
        totalAmplop: z.number().nullable(),
    }),
    perorangan: z.object({
        totalRupiah: z.number().nullable(),
    }),
    pembangunan: z.object({
        totalRupiah: z.number().nullable(),
    }),
    khusus: z.object({
        totalRupiah: z.number().nullable(),
    }),
    lainnya: z.object({
        totalRupiah: z.number().nullable(),
    }),
})

const kehadiranFormSchema = z.object({
    pria: z.number().refine(data => data >= 0, {
        message: "Jumlah pria tidak boleh negatif"
    }),
    wanita: z.number().refine(data => data >= 0, {
        message: "Jumlah wanita tidak boleh negatif"
    }),
})

const kehadiranJemaatFormSchema = z.object({
    kebaktianUmum: kehadiranFormSchema,
    kebaktianPemuda: kehadiranFormSchema,
    kebaktianRemaja: kehadiranFormSchema,
    kebaktianAnak: kehadiranFormSchema,
})

const majelisFormSchema = z.object({
    nama: z.string().min(1),
    tugas: z.string().min(1),
})

const catatanKebaktianFormSchema = z.object({
    jenisKebaktian: z.string().min(1),
    tanggalWaktuKebaktian: z.object({
        tanggal: z.date(),
        waktu: z.string().time(),
    }),
    perikopBacaan: z.object({
        kitab: z.string().min(1, "Kitab tidak boleh kosong"),
        pasal: z.string().min(1, "Pasal tidak boleh kosong"),
        ayatAwal: z.string().min(1),
        ayatAkhir: z.string().min(1)
    }).refine(data => data.ayatAwal <= data.ayatAkhir, {
        message: "Ayat awal tidak boleh lebih besar dari ayat akhir"
    }),
    temaRenungan: z.string().min(1),
    pelayananKhusus: z.object({
        baptisKudusAnak: z.number().nullable(),
        baptisKudusDewasa: z.number().nullable(),
        mengakuPercaya: z.number().nullable(),
        pemberkatanNikah: pemberkatanNikahFormSchema
    }),
    persembahan: persembahanFormSchema,
    kehadiranJemaat: kehadiranJemaatFormSchema,
    pesertaPerjamuanKudus: z.number().nullable().refine(data => data ? data >= 0 : true, {
        message: "Jumlah peserta perjamuan kudus tidak boleh negatif"
    }),
    majelis: majelisFormSchema,
    picIbadah: z.string().min(1),
    organis: z.string().min(1),
    prokantor: z.string().min(1),
    operator: z.string().min(1),
    createdDate: z.date(),
    majelisPembuat: z.string().min(1),
    evaluasiHalBaik: z.string().min(1),
    evaluasiPerluPerbaikan: z.string().min(1),

})

export { catatanKebaktianFormSchema }