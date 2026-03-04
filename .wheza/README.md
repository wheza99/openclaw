# OpenClaw Development Notes

Kumpulan catatan dan perintah untuk development OpenClaw.

## Menjalankan Gateway

```bash
# Start gateway di tmux session (recommended - tetap jalan meskipun terminal ditutup)
tmux new-session -d -s openclaw "cd /Users/whezagl/openclaw && pnpm openclaw gateway run --bind loopback --port 18789 --force"

# Cek status gateway
tmux capture-pane -t openclaw -p | tail -15

# Cek apakah gateway listening
lsof -i :18789 | grep LISTEN

# Stop gateway
tmux kill-session -t openclaw
# atau
pkill -9 -f "openclaw gateway"
```

## Build

```bash
cd /Users/whezagl/openclaw

# Build backend + UI (keduanya diperlukan untuk melihat perubahan)
npm run build          # Backend build (tsdown)
node scripts/ui.js build  # Control UI build (Vite)

# Atau satu perintah:
npm run build && node scripts/ui.js build
```

> **Penting:** Jika hanya mengubah file di `ui/src/`, cukup jalankan `node scripts/ui.js build`.
> Jika mengubah file di `src/`, jalankan `npm run build` terlebih dahulu.

## Akses

- **Gateway UI:** http://127.0.0.1:18789
- **Browser Control:** http://127.0.0.1:18791

## Changelogs

Lihat file `2603*.md` untuk history perubahan.
