# Das Archiv pflegen — Sanity

Die Bilder im Archiv werden in **Sanity** gepflegt. Diese Datei hat zwei Teile: die
**einmalige Einrichtung** (für Benni) und **die tägliche Arbeit** (für das ganze Team).

## So hängt es zusammen

```
eure-domain/admin ──► Sanity Studio (relapse-archiv.sanity.studio) ──► Inhalte in Sanity
                       Login bei Sanity                                       │
                                                                             │ beim Build
                                                                             ▼
                                              statische Website (nur HTML + Bilder vom CDN)
```

- **Die Website bleibt statisch.** Auf eurer Domain gibt es kein Login-Formular, keinen Server
  und keine Datenbank. `/admin` ist nur eine Weiterleitung.
- **Das Admin ist das Sanity Studio**, gehostet von Sanity. Dort passiert der Login, und nur
  eingeladene Teammitglieder kommen hinein.
- **Beim Build** (`pnpm build`) holt `scripts/pull-archive.ts` die veröffentlichten Arbeiten,
  rechnet für jedes Bild Ausschnitt und Belichtung aus und backt alles in die Seite ein.
  Besucher*innen reden nie mit Sanity.
- **Solange Sanity nicht verbunden ist**, baut die Seite aus dem lokalen Archiv
  (`src/content/archive.local.ts`) — genau so, wie sie vorher aussah.

---

## Einmalige Einrichtung

**Stand 04.10.2026:** Schritte 1–3 sind erledigt, die Import-Function ist bei Sanity
deployt. Offen sind Schritt 4 (Team einladen), der Instagram-Token in Schritt 5 und — sobald
es einen Host gibt — Schritt 6.

| | |
| --- | --- |
| Organisation | **RELAPSE** (`objcy3tju`) |
| Projekt | **RELAPSE Archiv** (`hx6xvawm`), Dataset `production`, öffentlich lesbar |
| Studio | **https://relapse-archiv.sanity.studio** — leitet weiter ins Sanity-Dashboard |
| Function | `instagram-import` im Stack `production` |
| Verwaltung | [sanity.io/manage](https://www.sanity.io/manage) |

### 1. Projekt anlegen ✓

```bash
npx sanity@latest login
npx sanity@latest organizations create --name "RELAPSE"
npx sanity@latest projects create "RELAPSE Archiv" --organization <org-id> --dataset production --dataset-visibility public
```

Ein neues Konto hat noch keine Organisation, deshalb der mittlere Schritt. Die Projekt-ID steht
in `studio/shared/project.ts`. Sie ist kein Geheimnis (sie steht in jeder Bild-URL) und gehört
ins Repository.

> Warum das Dataset öffentlich lesbar ist: Es enthält nur, was ohnehin auf der Website steht.
> Entwürfe sind in Sanity immer privat, und **schreiben** kann nur, wer eingeloggt und
> eingeladen ist. Ein privates Dataset würde einen Lese-Token im Build verlangen — ein
> Geheimnis mehr, ohne Gewinn an Sicherheit.

### 2. Studio installieren und veröffentlichen ✓

```bash
pnpm --dir studio install
pnpm studio            # lokal ansehen: http://localhost:3333
pnpm studio:deploy     # veröffentlicht nach relapse-archiv.sanity.studio
```

Die App-ID des Studios steht in `studio/sanity.cli.ts`, damit spätere Deploys nicht nachfragen.

### 3. Das heutige Archiv übertragen ✓

```bash
pnpm seed           # Probelauf: zeigt, was angelegt würde
pnpm seed --write   # legt die Arbeiten an und lädt die Bilder hoch
```

Läuft mit deinem CLI-Login, es wird kein API-Token angelegt. Mehrfach ausführen ist ungefährlich:
Arbeiten, die es schon gibt, werden nicht angefasst. Seit dem 04.10.2026 liegen die 19 Arbeiten
und 65 Bilder in Sanity, und `pnpm build` meldet `[archive] 19 Arbeiten, 65 Bilder aus Sanity`.

### 4. Das Team einladen

[sanity.io/manage](https://www.sanity.io/manage) → Projekt → **Members** → **Invite**.

- Rolle **Editor** für alle, die Inhalte pflegen. Editoren können Arbeiten anlegen, ändern und
  veröffentlichen, aber keine Mitglieder, Tokens oder Einstellungen verwalten.
- Rolle **Administrator** nur für ein bis zwei Personen.
- Wer das Team verlässt: dort wieder entfernen. Der Zugang ist damit sofort weg.

Eingeladene bekommen eine E-Mail und legen beim ersten Login ein Passwort fest.

### 5. Instagram verbinden

Der Import nutzt die **offizielle Instagram-API**. Das liefert jedes Bild eines Karussells in
voller Auflösung und Video-Cover ohne Play-Button — dafür nur Beiträge von **@timflp.archive**.

1. **@timflp.archive auf ein professionelles Konto umstellen** (in der Instagram-App:
   Einstellungen → Kontotyp → zu einem professionellen Konto wechseln → *Creator*). Kostenlos,
   ändert für Follower nichts.
2. Auf [developers.facebook.com](https://developers.facebook.com) eine App anlegen und das
   Produkt **„Instagram API with Instagram Login“** hinzufügen. Berechtigung:
   `instagram_business_basic`.
3. @timflp.archive als Tester eintragen und im App-Dashboard einen **Long-Lived Access Token**
   für das Konto erzeugen.
4. Den Token der Function geben — er landet nur bei Sanity, nie im Repository:

   ```bash
   npx sanity@latest functions env add instagram-import INSTAGRAM_ACCESS_TOKEN <token>
   ```

Die Function selbst ist schon deployt. Bis der Token da ist, antwortet der Knopf im Studio
nach ein paar Sekunden mit „Instagram ist noch nicht verbunden“ — getestet am 04.10.2026.

**Die Function später ändern und neu deployen:** Sie hat eigene Abhängigkeiten, also vorher
installieren.

```bash
pnpm --dir functions/instagram-import install
npx sanity@latest blueprints deploy
```

Die lokale Verknüpfung zum Stack liegt in `.sanity/` (nicht im Repository). Auf einem neuen
Rechner einmal `npx sanity@latest blueprints init . --blueprint-type ts --stack-name production --project-id hx6xvawm` —
das bestehende `sanity.blueprint.ts` wird dabei nicht überschrieben.

#### Token alle 60 Tage erneuern

Ein Long-Lived Token gilt **60 Tage**. Rechtzeitig verlängern (frühestens 24 Stunden nach dem
Erzeugen):

```bash
curl "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=<alter-token>"
npx sanity@latest functions env add instagram-import INSTAGRAM_ACCESS_TOKEN <neuer-token>
```

Läuft er doch ab, sagt der Import im Studio genau das: „Der Instagram-Zugang ist abgelaufen“.
Bis dahin funktioniert der Datei-Upload ganz normal weiter.

### 6. Automatisch neu bauen, wenn etwas veröffentlicht wird

Solange die Seite keinen Host hat, wird sie nur neu gebaut, wenn jemand `pnpm build` ausführt.
Sobald der Host feststeht:

1. Beim Host einen **Deploy Hook** anlegen (Vercel, Netlify und Cloudflare Pages haben das
   alle) — das ist eine geheime URL, die einen Neubau startet.
2. In [sanity.io/manage](https://www.sanity.io/manage) → **API** → **Webhooks** → **Create**:
   - URL: der Deploy Hook
   - Dataset: `production`, Trigger: *Create*, *Update*, *Delete*
   - Filter: `_type == "archiveWork"`, Drafts **nicht** einschließen
   - Methode: POST

Dann gilt: Veröffentlichen im Studio → nach ein bis zwei Minuten ist es live.

---

## Die tägliche Arbeit (für das Team)

Einloggen: **eure-domain/admin** aufrufen, mit E-Mail und Passwort anmelden.

Links stehen die drei Seiten der Website: **Tim — Portfolio**, **Yung Shattered** und
**relapse**. In jeder Seite liegen die vier Bereiche **Events**, **Videoarbeiten**,
**Releases & Cover** und **Freie Arbeiten**. Neue Arbeiten immer *im* passenden Bereich
anlegen (das „+“ oben), dann sind Seite und Bereich schon gesetzt.

Wo eine Arbeit auf der Website landet:

| Seite | Bereich | erscheint unter |
| --- | --- | --- |
| Tim — Portfolio | Events | **Events** (die Startseite) |
| Tim — Portfolio | Videoarbeiten | **Videos** |
| Tim — Portfolio | Freie Arbeiten, Releases & Cover | **Serien** |
| Yung Shattered | alle | **Yung Shattered** (Videos, dann Bilder) |
| relapse | alle | **relapse** |

### Eine Arbeit anlegen

| Feld | Was hinein gehört |
| --- | --- |
| Titel | wie die Arbeit im Archiv heißen soll, z. B. *bone stew im RATS* |
| Seite | ist gesetzt, wenn du im Bereich auf „+“ geklickt hast |
| Bereich | ebenso |
| Datum | Tag, an dem der Beitrag auf Instagram erschienen ist — danach wird sortiert |
| Kurzinfo | eine Zeile, z. B. *Punk · Live* oder *@yung.shattered · Videoclip* |
| Instagram-Beitrag | Link zum Beitrag; die Arbeit verlinkt dorthin |
| Bilder | per Drag & Drop hochladen — oder per Instagram übernehmen, siehe unten |
| Nicht anzeigen | Haken setzen, um eine Arbeit von der Website zu nehmen, ohne sie zu löschen |

### Bilder: die eine Regel

Eine Bildreihe auf der Seite ist **zwei Bilder breit**, und eine Serie soll ohne Lücke
aufgehen. Deshalb:

- **Events** und **Freie Arbeiten**: **4 oder 8 Bilder** (höchstens 12).
- **Videoarbeiten** und **Releases & Cover**: **genau 1 Bild**.

Mit 5 Bildern stünde das fünfte allein in seiner Reihe. Das Studio lässt so etwas nicht
veröffentlichen und sagt, worauf du kürzen sollst.

Jedes Bild braucht einen **Alt-Text**: ein Satz, was darauf zu sehen ist. Er ist für alle,
die das Bild nicht sehen können, und ohne ihn lässt sich nicht veröffentlichen.

**Ausschnitt:** In der Übersicht ist jedes Bild ein Hochformat 4:5. Auf ein Bild klicken →
den Bildpunkt (Hotspot) auf das Wichtigste setzen, dann wird um diese Stelle herum
geschnitten. Wer auf ein Bild klickt, sieht es groß und unbeschnitten.

**Formate:** JPEG, PNG, WebP, AVIF, TIFF und GIF. Je größer, desto besser — die Seite holt sich
jedes Bild passend zugeschnitten in mehreren Größen und als WebP/AVIF selbst, die Großansicht
bis 2400 px.

**Nicht** angenommen werden **HEIC** (das Standardformat von iPhone-Fotos), BMP und JPEG 2000.
Vom iPhone direkt hochladen klappt trotzdem — iOS wandelt dabei selbst in JPEG um. Liegt eine
`.heic`-Datei auf dem Mac: in Vorschau öffnen → Ablage → Exportieren → Format JPEG. Dauerhaft
lösen: iPhone → Einstellungen → Kamera → Formate → **Maximale Kompatibilität**.

### Bilder von Instagram übernehmen

1. Den Link im Feld **Instagram-Beitrag** eintragen.
2. Unten rechts im Menü neben „Publish“: **„Bilder von Instagram übernehmen“**.
3. Ein paar Sekunden warten. Über den Bildern erscheint der Status, dann die Bilder.
4. Auf 4 oder 8 kürzen (bzw. 1), Alt-Texte schreiben, **Publish**.

Der Import **ersetzt** die Bilder der Arbeit. Er funktioniert nur mit Beiträgen von
**@timflp.archive** — Bilder von anderen Konten bitte als Datei hochladen.

### Eine Arbeit ausblenden

Haken bei **„Nicht anzeigen“** setzen und **Publish**: Die Arbeit verschwindet beim nächsten
Build von der Website, bleibt aber im Studio — gesammelt links unter **Ausgeblendet**. Zum
Zurückholen den Haken wieder entfernen.

### Veröffentlichen

Änderungen sind erst ein Entwurf. **Publish** macht sie öffentlich; danach wird die Seite neu
gebaut (automatisch, sobald Schritt 6 der Einrichtung erledigt ist).

---

## Sicherheit — was geschützt ist und was nicht

**Geschützt durch den Aufbau:**

- Auf der Website gibt es nichts zum Angreifen: kein Login, kein Server, keine Datenbank, keine
  Schlüssel im Code oder im Browser.
- Passwörter, Sitzungen und Rechte verwaltet Sanity. Nichts davon liegt bei euch.
- Nur eingeladene Projektmitglieder sehen und ändern etwas. Das ist die eigentliche Sperre:
  Wer nicht im Projekt ist, kann sich zwar bei Sanity anmelden, sieht aber keinen einzigen
  Entwurf und kann nichts schreiben.
- Das Studio führt direkt zur Anmeldung mit **E-Mail und Passwort**. Erzwingen lässt sich die
  Anmeldeart im kostenlosen Tarif nicht: Unter dem Formular verlinkt Sanity „Other login
  options“ (Google, GitHub, SSO). Das schadet nicht — es ist dieselbe Mitgliedschaftsprüfung —,
  aber „nur E-Mail und Passwort“ ist eine Voreinstellung, keine Sperre.
- Der Instagram-Token liegt nur in Sanitys Function-Umgebung, nicht im Repository.
- Was in Sanity kaputt ist, geht nicht live: Der Build prüft dieselben Regeln wie das Studio und
  bricht ab, statt eine kaputte Seite auszuliefern. Der Host zeigt dann weiter die letzte gute.

**Das Restrisiko ist das Konto selbst.** Wer das Passwort eines Teammitglieds kennt, ist drin.
Deshalb:

- Für jedes Konto ein **eigenes, langes Passwort** aus einem Passwortmanager — nie eines, das
  auch woanders benutzt wird.
- Nie über einen Link aus einer E-Mail einloggen, immer über **eure-domain/admin**.
- Wer geht, wird sofort aus dem Projekt entfernt.
- Rolle *Administrator* so selten wie möglich vergeben.

Eine Zwei-Faktor-Absicherung für Sanitys E-Mail/Passwort-Konten haben wir in Sanitys
Dokumentation nicht gefunden. Wer es sicherer will, meldet sich über **„Other login options“
mit Google oder GitHub** an und hat dort Zwei-Faktor-Authentifizierung eingeschaltet — das
funktioniert schon jetzt, ohne Änderung.

> Benni: Dein Sanity-Konto ist ein Google-Konto. Du meldest dich also über „Other login
> options“ → „Continue with Google“ an, nicht über das E-Mail-Formular.
