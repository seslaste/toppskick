# Topps Kick Prototype

SvelteKit Prototype zum Sammeln, Verwalten und Tauschen von Top Kicks Karten.

## Features

- Hauptworkflow: Karten erfassen, Uebersicht anzeigen, Karten bearbeiten und loeschen.
- Optionaler Workflow: Karten als "Tauschbar" markieren.
- MongoDB Persistenz fuer die Sammlung.

## Lokales Setup

1. Abhaengigkeiten installieren:

```sh
npm install
```

2. `.env` anlegen (Beispiel):

```sh
MONGODB_URI="mongodb+srv://user:pass@cluster0.mongodb.net/"
DB_NAME="toppskick"
```

3. Dev-Server starten:

```sh
npm run dev
```

## Projektstruktur (relevant)

- `src/routes/+page.svelte` - Uebersicht (Daten aus MongoDB).
- `src/routes/cards/new/+page.svelte` - Karte erfassen.
- `src/routes/cards/[id]/+page.svelte` - Karte bearbeiten.
- `src/lib/server/mongo.js` - MongoDB Verbindung.
- `src/lib/components` - Wiederverwendbare UI-Komponenten.

## Deployment (Netlify)

- Adapter ist bereits auf Netlify gestellt (`@sveltejs/adapter-netlify`).
- Build-Command: `npm run build`.
- Publish-Directory: `build`.
- Umgebungsvariablen in Netlify setzen: `MONGODB_URI`, `DB_NAME`.
