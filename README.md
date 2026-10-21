# Dragon-Ball-vs-Naruto

A responsive, cinematic fan-made comparison site for Dragon Ball and Naruto. The homepage includes a split ki-and-chakra hero, universe introductions, a searchable 14-character archive, a 12-entry transformation library, editorial power profiles, and a clearly labeled hypothetical battle arena. The libraries support search, filters, and keyboard-accessible detail dialogs. Character and form artwork uses clearly marked CSS placeholders because no authorized local artwork is included; no external image URLs are used.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production build, run:

```powershell
npm run build
```

## Project structure

- `src/App.tsx` contains the page sections and navigation targets.
- `src/data/characters.ts` contains the typed character profiles and separate fan-made power estimates.
- `src/data/transformations.ts` contains typed form, mode, ocular ability, and technique entries with canon and continuity notes.
- `src/data/battleProfiles.ts` contains fan-estimated combat attributes, strengths, weaknesses, and available forms.
- `src/engine/battleEngine.ts` is the deterministic matchup engine, independent of the interface.
- `src/components/` contains reusable action links, searchable archives, accessible detail dialogs, and reduced-motion-aware scroll reveals.
- `src/styles.css` contains responsive layouts, energy effects, and reduced-motion styling.
- `index.html` is the Vite entry point.

## Battle model

The fictional score combines speed (20%), strength (25%), durability (20%), abilities (20%), and combat experience (15%). Selected forms apply capped stat modifiers; a matching terrain affinity adds 4 points. Scores within 1 point are called a draw. Character attributes and power estimates are editorial fan estimates, not official statistics or objective measurements. Battle narration is assembled locally from profile and environment data; no AI service is configured.

Run the scoring tests with `npm test`. They use TypeScript's test-only emit and Node's built-in test runner.

## Transformation classifications

The library separates physical transformations, power modes, ocular abilities, and special techniques. Ultra Instinct is labeled as a power mode/technique, Mangekyo Sharingan entries as ocular abilities, and Susanoo as a special technique. The requested “Legendary Super Saiyan” Broly entry is marked as the Z-film portrayal; Dragon Ball Super uses “Full Power Super Saiyan” for its canon Broly form. These are canon-focused examples, not fan-made transformations.

Character portrait panels are intentional placeholders and should be replaced with licensed or otherwise authorized artwork before publication. Matchup commentary is interpretive and is not official canon.