# Frontendapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

```markdown
# Frontend (Angular)

Dieses Repository enthält das Angular-Frontend (Standalone-Components) — gebaut für Angular 21.

## Schnellstart (Entwicklung)

- Abhängigkeiten installieren:

```powershell
npm install
```

- Dev-Server starten:

```powershell
npm start
# oder direkt: ng serve --open
```

Die App ist dann unter http://localhost:4200/ erreichbar.

## Build

```powershell
npm run build
```

Erzeugte Artefakte landen in `dist/`.

## Backend-URL konfigurieren

Die Frontend-API-Base-URL befindet sich in `src/app/kunden.service.ts` als `apiUrl`. Passe dort die URL an (z. B. `http://localhost:8090/api/kunden`), falls dein Backend unter einer anderen Adresse läuft.

## VS Code Hinweise

- Falls du nach Änderungen noch alte "Module not found"- oder LSP-Fehler siehst, starte den TypeScript-Server neu: `Ctrl+Shift+P` → "TypeScript: Restart TS Server" oder starte VS Code neu.

## Was wurde verbessert

- Projekt auf Angular 21 geprüft und Syntax-Fehler entfernt (z. B. entfernte Markdown-Fences in Quelltexten).
- CRUD-Service (`KundenService`) mit `findAll`, `create`, `update`, `delete` implementiert.
- Material-basierte UI: Liste, Dialoge (Add/Edit), Confirm-Dialog, SnackBar.

## Weiteres / Vorschläge

- Bundle-Größe optimieren (selective Material-Imports, lazy loading)
- Linting (ESLint) durchlaufen lassen und kleinere Warnungen bereinigen
- Optional: Unit-Tests für Service + Component-Integration hinzufügen

```
