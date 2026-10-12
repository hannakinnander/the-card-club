# The Card Club

Webbshop - Projektarbete för att praktisera teknikerna vi lärt oss med React.

## Om projektet

Vår webbshop säljer fotbollskort.

Varje fotbollskort tillhör tre olika kategorityper:

- **Kön** – Damer, Herrar
- **Nationalitet** – Sverige, Spanien, England, Frankrike
- **Position** – Målvakt, Försvarare, Mittfältare, Anfallare

En produkt kan alltså ha ett värde från varje kategorityp, exempelvis:
**Herrar + Spanien + Anfallare**.

## Kom igång

### Installera depencencies, starta projektet

```terminal
npm install
npm run start
```

### Kör tester

```terminal
npm run test
```

## Övergripande struktur

Alla komponentmappar utöver common, header och footer motsvarar en Route och innehåller komponenter som endast hör till respektive Route.

```text
the-card-club/
├── public/
│       ├── card-images/ *Produktbilder*
│       ├── Logo/ *Vår logga*
│       └── video/ *Hero-video*
├── src/
│   ├── api/
│   ├── components/
│   │   ├── common/ *Komponenter som återanvänds*
│   │   ├── ProductPage/
│   │   ├── DetailPage/
│   │   ├── CartPage/
│   │   ├── CheckoutPage/
│   │   ├── ConfirmationPage/
│   │   ├── Header/
│   │   └── Footer/
│   │
│   ├── context/
│   │   └── CartContext/
│   │
│   ├── tests/
│   ├── hooks/
│   ├── types/
│   └── App.tsx
│
├── db.json
├── package.json
├── package-lock.json
└── README.md
```
