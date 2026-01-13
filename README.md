# Deno GraphQL Framework Boilerplate

Proyek ini adalah sebuah boilerplate yang dirancang sebagai fondasi "framework" untuk membangun API GraphQL menggunakan Deno, MongoDB (dengan Mongoose), dan TypeScript.

## Filosofi

Struktur proyek ini memisahkan antara **inti framework** dan **kode aplikasi**.

-   **Inti Framework (`shared/`, `scripts/`)**: Berisi semua kode yang dapat digunakan kembali dan alat bantu (seperti koneksi DB, skalar, guards, dan code scaffolder). Bagian ini seharusnya jarang diubah.
-   **Kode Aplikasi (`src/`)**: Tempat Anda membangun logika bisnis aplikasi Anda. Semua modul baru (misal: `product`, `user`) akan berada di sini.

## Fitur

- **Deno & GraphQL**: Server GraphQL modern menggunakan `graphql-yoga`.
- **MongoDB**: Integrasi dengan Mongoose.
- **Struktur Framework**: Pemisahan yang jelas antara kode inti dan kode aplikasi.
- **Code Scaffolding**: Termasuk skrip internal untuk membuat modul baru dengan cepat.
- **Path Alias**: Menggunakan `importMap` di `deno.jsonc` untuk path alias yang bersih (`@/` untuk aplikasi, `#shared/` untuk framework).

## Prasyarat

- [Deno](https://deno.land/manual/getting_started/installation) versi 1.x
- [MongoDB](https://www.mongodb.com/try/download/community)

## Cara Memulai

1.  **Buat File `.env`**:
    Salin `.env.example` ke file baru bernama `.env` dan sesuaikan nilainya.
    ```bash
    cp .env.example .env
    ```

2.  **Jalankan Server**:
    ```bash
    deno task start
    ```
    Server akan berjalan di `http://localhost:8000/graphql`.

## Code Scaffolding

Framework ini menyertakan *task* Deno untuk membuat modul baru secara otomatis di dalam direktori `src`.

**Penggunaan:**
Jalankan `deno task g` dari direktori root proyek. Ganti `<ModuleName>` dengan nama modul yang Anda inginkan.

```bash
deno task g <ModuleName>
```

**Contoh:**
Untuk membuat modul `product`:
```bash
deno task g product
```
Ini akan membuat direktori `src/product` beserta semua file yang diperlukan (resolver, service, dll.).

## Struktur Proyek

```
/
├── scripts/              # Alat bantu internal framework
│   ├── templates/
│   └── scaffold.ts
├── shared/               # Library inti framework
│   ├── config/
│   ├── database/
│   ├── guards/
│   ├── scalar/
│   ├── types/
│   └── utils/
├── src/                  # Kode aplikasi Anda
│   └── health/           # Modul contoh
├── .env.example
├── deno.jsonc
├── main.ts
└── README.md
```

## Mekanisme Impor

Proyek ini menggunakan `importMap` untuk path alias:
-   `@/`: Menunjuk ke direktori `src/`. Gunakan untuk impor antar modul di dalam aplikasi Anda.
-   `#shared/`: Menunjuk ke direktori `shared/`. Gunakan untuk mengakses fungsionalitas inti dari framework.

**Contoh:**
```typescript
// Impor dari modul aplikasi lain
import { ProductService } from '@/product/product.service.ts';

// Impor dari inti framework
import { AppContext } from '#shared/config/context.ts';
```