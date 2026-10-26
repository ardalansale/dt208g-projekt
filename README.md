# DT207G Projektarbete - Mittuniversitetet Kursplanering

En studentfokuserad webbapplikation utvecklad med Angular och TypeScript för Mittuniversitetet som en del av projektuppgiften. Applikationen låter studenter söka, filtrera och sortera bland tillgängliga kurser samt bygga ihop ett eget, personligt ramschema där totala högskolepoäng räknas samman och sparas via `localStorage`.

## GitHub-repo
https://github.com/ardalansale/dt208g-projekt

## Publicerad webbplats
https://dt208g-projekt.netlify.app/

## Funktionalitet
- **Startsida:** Presenterar en översikt över lärosätet samt dynamisk statistik över tillgängliga kurser.
- **Kurslista:** Möjlighet att söka, filtrera på ämne/kurskod/namn och sortera data. Dynamiska knappar för att lägga till eller ta bort kurser direkt i listan utan omladdning.
- **Ramschema:** Visar det skapade ramschemat, räknar automatiskt samman totala högskolepoäng och hanterar borttagning av kurser.
- **Persistent lagring:** Valda kurser i ramschemat sparas automatiskt i webbläsarens `localStorage` (`miun_schedule`) och läses in på nytt vid sidomladdning.
- **Navigering och 404:** Fullskalig routing med aktiva länkmarkeringar i headern (`routerLinkActive`) samt en wildcard-route som skickar ogiltiga sökvägar till startsidan.
- **Anpassad design:** Webbplatsen har ett skräddarsytt utseende med CSS-variabler, flexibel grid/flexbox-layout och en egen CSS-reset (inga externa CSS-ramverk som Tailwind har använts).

## Struktur och komponenter
- `src/app/components/header/` – Huvudmeny med router-länkar och aktiv markering.
- `src/app/components/home/` – Startsida med statistikmoduler.
- `src/app/components/course-list/` – Vy för att söka, filtrera, sortera och lägga till kurser.
- `src/app/components/schedule/` – Vy för det personliga ramschemat och poängräkning.
- `public/miun_courses.json` – Innehåller kurskatalogen för Mittuniversitetet.
- `src/styles.css` – Globala stilar, CSS-variabler, custom reset och konsekvent indentering.

## Tekniker
- Angular (Standalone Components, Routing)
- TypeScript
- HTML5 / CSS3 (CSS Custom Properties)
- LocalStorage API

## Användning och installation
1. Klona repositoryt lokalt:
   ```bash
   git clone https://github.com/ardalansale/dt208g-projekt