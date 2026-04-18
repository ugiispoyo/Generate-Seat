# ✈️ Airline Voucher Seat Assignment App

Aplikasi untuk menghasilkan 3 kursi random unik per flight untuk pemenang voucher penerbangan, dengan validasi layout pesawat dan pencegahan duplikat.

## 📋 Deskripsi

Aplikasi web full-stack yang:
- Generate 3 kursi unik random berdasarkan tipe pesawat
- Validasi kursi sesuai aircraft layout (ATR, Airbus 320, Boeing 737 Max)
- Cegah duplikat untuk kombinasi flight number + date yang sama
- Simpan ke database SQLite

## 🛠️ Tech Stack

- **Backend:** Laravel 10 (PHP 8.1+)
- **Frontend:** Vite + React + Tailwind CSS
- **Database:** SQLite

---

## 📋 Spesifikasi Sistem

### Prerequisites
- Node.js v20+
- npm v11+
- PHP 8.1+
- Composer 2.0+

Verifikasi:
```bash
node -v && npm -v && php -v && composer -v
```

---

## 🚀 Cara Menjalankan

### 1. Setup Backend (Terminal 1)

```bash
cd /Users/ugiispoyowidodo/Data/pribadi/Flight/backend

# Install dependencies
composer install

# Setup database
touch database/database.sqlite
php artisan migrate:fresh

# Run server
php artisan serve
```

**Backend berjalan di: `http://127.0.0.1:8000`**

---

### 2. Setup Frontend (Terminal 2)

```bash
cd /Users/ugiispoyowidodo/Data/pribadi/Flight/frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

**Frontend berjalan di: `http://localhost:5173`**

---

### 3. Akses Aplikasi

Buka browser ke: **`http://localhost:5173`**

---

## 📝 Penggunaan

Form input:
- **Crew Name** - Nama crew
- **Crew ID** - ID crew
- **Flight Number** - Nomor penerbangan (e.g., GA102)
- **Flight Date** - Tanggal (YYYY-MM-DD)
- **Aircraft** - Pilih ATR / Airbus 320 / Boeing 737 Max

Flow:
1. Isi semua field
2. Klik "Generate Vouchers"
3. Sistem check apakah sudah ada voucher untuk flight + date itu
4. Jika baru → generate 3 kursi unik
5. Jika Ada → tampilkan error duplicate

---

## ✈️ Aircraft Rules

| Pesawat | Rows | Kursi | Contoh |
|---------|------|-------|--------|
| ATR | 1-18 | A, C, D, F | 1A, 18F |
| Airbus 320 | 1-32 | A-F | 1A, 32F |
| Boeing 737 Max | 1-32 | A-F | 1A, 32F |

---

## 🔌 API Endpoints

**POST /api/check** - Cek status voucher
```json
{ "flightNumber": "GA102", "date": "2025-07-12" }
→ { "exists": false }
```

**POST /api/generate** - Generate seats baru
```json
{
  "name": "Sarah",
  "id": "98123",
  "flightNumber": "GA102",
  "date": "2025-07-12",
  "aircraft": "Airbus 320"
}
→ { "success": true, "seats": ["3B", "7C", "14D"] }
```

---

## 🧪 Testing

```bash
cd backend
php artisan test
```

Expected: 6 tests passed

---

## 🔧 Build Production

```bash
cd frontend
npm run build
```

Output akan di folder `dist/`

---

**Version:** 1.0.0 | **Date:** April 18, 2026
