# DT207G / DT208G Projektarbete - Mittuniversitetet Kursplanering
En studentfokuserad webbapplikation utvecklad med Angular och TypeScript för Mittuniversitetet som en del av projektuppgiften. Applikationen låter studenter söka, filtrera och sortera bland tillgängliga kurser samt bygga ihop ett eget, personligt ramschema där totala högskolepoäng räknas samman och sparas via `localStorage`.

## GitHub-repo
https://github.com/ardalansale/dt208g-projekt

## Publicerad webbplats
https://dt208g-projekt.netlify.app/

---

## Betygsnivå
Projektet har utvecklats med målet att uppfylla kursens **grundkrav**. Under utvecklingsprocessen har fokus legat på att skapa en stabil, ren och logisk struktur som gör det som krävs på ett tillförlitligt sätt, där design- och funktionsval har gjorts utifrån vad som känts mest naturligt för applikationens användbarhet.

---

## Funktionalitet
- **Startsida:** Presenterar en översikt över lärosätet samt dynamisk statistik över tillgängliga kurser.
- **Kurslista:** Möjlighet att söka, filtrera på ämne/kurskod/namn och sortera data. Dynamiska knappar för att lägga till eller ta bort kurser direkt i listan utan omladdning samt en klientbaserad pagineringslösning.
- **Ramschema:** Visar det skapade ramschemat, räknar automatiskt samman totala högskolepoäng och hanterar borttagning av kurser med dubblettkontroll.
- **Persistent lagring:** Valda kurser i ramschemat sparas automatiskt i webbläsarens `localStorage` (`miun_schedule`) och läses in på nytt vid sidomladdning.
- **Navigering och routing:** Fullskalig routing med aktiva länkmarkeringar i headern (`routerLinkActive`) samt hantering av ogiltiga sökvägar.
- **Anpassad design:** Webbplatsen har ett skräddarsytt utseende med CSS-variabler, flexibel grid/flexbox-layout och en egen CSS-reset (inga externa CSS-ramverk har använts).

## Struktur och komponenter
- `src/app/components/header/` – Huvudmeny med router-länkar och aktiv markering.
- `src/app/components/home/` – Startsida med statistikmoduler.
- `src/app/components/course-list/` – Vy för att söka, filtrera, sortera, paginera och lägga till kurser.
- `src/app/components/schedule/` – Vy för det personliga ramschemat och poängräkning.
- `src/app/services/` – Dedikerade tjänster (`CourseService` och `ScheduleService`) för affärslogik, inläsning och dubblettkontroll.
- `public/miun_courses.json` – Innehåller kurskatalogen för Mittuniversitetet.
- `src/styles.css` – Globala stilar, CSS-variabler, custom reset och tillgänglighetsregler (`:focus-visible`).

## Tekniker
- Angular (Standalone Components, Routing, HttpClient)
- TypeScript (Strikt typning och interfaces)
- HTML5 / CSS3 (CSS Custom Properties)
- LocalStorage API

## Användning och installation
1. Klona repositoryt lokalt:

   ```bash
   git clone https://github.com/ardalansale/dt208g-projekt.git
   ```

2. Navigera till mappen och installera beroenden:

   ```bash
   cd dt208g-projekt
   npm install
   ```

3. Starta utvecklingsservern:

   ```bash
   ng serve
   ```

4. Öppna webbläsaren på `http://localhost:4200/`.