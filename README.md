# Devscale LMS

Kursus **Building Learning Management System with Next.js and Server Actions** dari [Devscale.id](https://www.devscale.id/courses/building-lms-next-action)

## Fitur

- Login berdasarkan email dan password
- Login menggunakan Google
- Register dan verifikasi email menggunakan [Resend](https://resend.com/)
- Course CRU (Create, Read, Update). Fitur delete belum ada
- Section CRUD
- Lesson CRUD
- Pembayaran menggunakan [Mayar](https://mayar.id/)
- Ketika user sudah memiliki course, maka user tidak bisa membeli course yang sama dan user akan diarahkan ke course tersebut

## Teknologi

- Next.js versi 15.0.0-canary.172
- Tailwind CSS
- PostgreSQL dengan Prisma
- Cloudflare R2 Object Storage (compatible with Amazon S3)

## Todo

- [ ] Middleware untuk mengecek apakah user sudah login atau belum
- [ ] Tombol logout
- [ ] Cek apakah paymentLink sudah expired atau belum. Jika sudah expired, maka buat transaksi baru
- [ ] Delete course di sisi admin sehingga tidak bisa diakses admin dan user tapi pastikan user yang sudah membeli masih memiliki akses ke course tersebut
- [ ] Assign course ke 1 atau banyak user
- [ ] Buat kode kupon diskon. Kode kupon bisa digenerate otomatis (misal AUJGB7U21RSG )atau manual (misal DISKON10). Kupon diskon hanya bisa digunakan 1 kali oleh 1 user. Kupon diskon bisa expired otomatis setelah X hari/bulan/tahun/atau setelah X kali digunakan/tanggal tertentu.
- [ ] Dari sisi admin, bisa melihat siapa saja yang menggunakan kode kupon diskon dan berapa kali kode kupon diskon digunakan
- [ ] Dari sisi user, bisa melihat kode kupon diskon yang tersedia (memang disediakan untuk umum, dan dipromosikan di blog)
- [ ] Dari sisi admin, bisa menambahkan course ke dalam bundle. Bundle adalah kumpulan course yang dijual dengan harga lebih murah dibandingkan membeli course secara terpisah. Bundle bisa expired otomatis setelah X hari/bulan/tahun/atau setelah X kali dibeli/tanggal tertentu.
- [ ] Dari sisi admin, bisa menambahkan 1 atau banyak user. Ketika penambahan banyak user bisa menggunakan Excel atau CSV
- [ ] Untuk setiap user, bisa melihat progress dari course yang diambil. Progress bisa berupa persentase atau jumlah lesson yang sudah dikerjakan
- [ ] Untuk sertifikat, bisa diunduh oleh user yang sudah menyelesaikan course dan menyelesaikan assignment.
- [ ] Tambahkan fitur mark as done untuk setiap lesson
- [ ] Tambahkan fitur pembelian course secara patungan.
- [ ] Tambahkan fitur pembelian course dengan cicilan.
- [ ] Tambahkan fitur mark as paid untuk setiap transaksi. Hal ini bisa digunakan untuk menandai ketika terjadi gangguan pada pembayaran Mayar.
- [ ] Tambahkan fitur analytics mingguan bulanan dan tahunan. Analytics bisa berupa jumlah user baru, jumlah course yang dibeli, jumlah transaksi, jumlah user yang menggunakan kode kupon diskon, jumlah user yang menggunakan bundle
- [ ] Tambahkan fitur sertifikat kadaluarsa setelah 3 tahun.

## Cara menjalankan

1. `pnpm dlx prisma db push`
2. `pnpm dlx prisma db seed`
3. `pnpm run dev`

### Catatan

Terinspirasi dari [Devscale Indonesia](https://www.devscale.id/), [BuildWith Angga](https://buildwithangga.com/), [Dicoding](https://www.dicoding.com/), dan [Jago Flutter](https://jagoflutter.com/)
