const npkDaten = {
    graten: {
        name: 'Gräten',
        n: 3.0, p: 2.0, k: 0.1,
        ph: 7.0,
        zersetzung: '3-6 Monate',
        ca: 1.5, mg: 0.3, s: 0.2,
        sonstiges: ['Fe', 'Mn', 'F']
    },
    karottengrun: {
        name: 'Karottengrün',
        n: 1.5, p: 0.3, k: 1.5,
        ph: 6.5,
        zersetzung: '2-4 Wochen',
        ca: 0.8, mg: 0.4, fe: 0.05,
        sonstiges: ['Mn', 'B']
    },
    bananenschale: {
        name: 'Bananenschale',
        n: 0.6, p: 0.2, k: 4.2,
        ph: 6.0,
        zersetzung: '1-3 Wochen',
        ca: 0.3, mg: 0.2, na: 0.1,
        sonstiges: ['Fe', 'Mn', 'Zn', 'Cu']
    },
    steinmehl: {
        name: 'Steinmehl',
        n: 0.0, p: 0.5, k: 0.3,
        ph: 7.0,
        zersetzung: 'Jahre (Mineral)',
        ca: 35, mg: 12, si: 10,
        sonstiges: ['Fe', 'Mn']
    },
    mandelschale: {
        name: 'Mandelschale',
        n: 0.3, p: 0.1, k: 0.2,
        ph: 7.0,
        zersetzung: '2-4 Monate',
        ca: 0.5, mg: 0.2, fe: 0.03,
        sonstiges: ['Mn']
    },
    huhnermist: {
        name: 'Hühnermist',
        n: 1.63, p: 1.54, k: 0.85,
        ph: 7.5,
        zersetzung: '1-2 Monate',
        ca: 2.5, s: 0.5, mg: 0.3,
        sonstiges: ['Mn', 'Cu', 'Zn', 'B', 'Fe', 'Mo', 'Cl']
    },
    kokosschale: {
        name: 'Kokosschale',
        n: 0.2, p: 0.1, k: 0.1,
        ph: 7.0,
        zersetzung: '6-12 Monate',
        ca: 0.1, mg: 0.1, si: 0.3,
        sonstiges: []
    },
    milch: {
        name: 'Milch',
        n: 3.5, p: 0.3, k: 0.1,
        ph: 6.5,
        zersetzung: '1-2 Wochen (flüssig)',
        ca: 1.2, s: 0.2, mg: 0.1,
        sonstiges: ['Zn']
    },
    traubenzesten: {
        name: 'Traubenzesten',
        n: 0.5, p: 0.2, k: 0.3,
        ph: 6.5,
        zersetzung: '4-8 Wochen',
        ca: 0.3, mg: 0.2, fe: 0.04,
        sonstiges: ['Mn', 'Zn']
    },
    molke: {
        name: 'Molke',
        n: 2.5, p: 0.1, k: 0.1,
        ph: 5.0,
        zersetzung: '1 Woche (flüssig)',
        ca: 0.4, s: 0.1, mg: 0.1,
        sonstiges: []
    },
    zitronenschale: {
        name: 'Zitronenschale',
        n: 0.4, p: 0.2, k: 0.8,
        ph: 4.5,
        zersetzung: '2-4 Wochen',
        ca: 0.4, mg: 0.2, fe: 0.03,
        sonstiges: ['Mn']
    },
    brennnesseljauche: {
        name: 'Brennnesseljauche',
        n: 2.0, p: 0.2, k: 1.5,
        ph: 7.8,
        zersetzung: 'Sofort (flüssig)',
        fe: 0.08, mg: 0.3, ca: 0.2,
        sonstiges: ['Mn', 'B']
    },
    laub: {
        name: 'Laub',
        n: 1.0, p: 0.15, k: 0.35,
        ph: 6.0,
        zersetzung: '6-12 Monate',
        ca: 1.0, mg: 0.5, fe: 0.06,
        sonstiges: ['Mn', 'B', 'Zn', 'Se', 'Na']
    },
    knochenmehl: {
        name: 'Knochenmehl',
        n: 3.5, p: 18.0, k: 0.0,
        ph: 7.5,
        zersetzung: '6-12 Monate',
        ca: 22, s: 1.5, mg: 0.2,
        sonstiges: ['Zn', 'Cu', 'Mn']
    },
    hornspäne: {
        name: 'Hornspäne',
        n: 12.5, p: 1.75, k: 0.0,
        ph: 7.0,
        zersetzung: '6-12 Monate',
        s: 1.5, ca: 0.3, mg: 0.1,
        sonstiges: []
    },
    kaffeesatz: {
        name: 'Kaffeesatz',
        n: 2.0, p: 0.32, k: 0.28,
        ph: 5.0,
        zersetzung: '2-4 Wochen',
        ca: 0.5, mg: 0.3, fe: 0.04,
        sonstiges: ['Cu', 'Mn']
    },
    erdnussschale: {
        name: 'Erdnussschale',
        n: 0.8, p: 0.15, k: 0.5,
        ph: 7.0,
        zersetzung: '2-3 Monate',
        ca: 0.4, mg: 0.2, fe: 0.03,
        sonstiges: ['Mn']
    },
    bier: {
        name: 'Bier',
        n: 1.5, p: 0.3, k: 0.5,
        ph: 4.5,
        zersetzung: '1 Woche (flüssig)',
        mg: 0.1, ca: 0.1, fe: 0.02,
        sonstiges: ['Zn']
    },
    zwiebelschalen: {
        name: 'Zwiebelschalen',
        n: 0.5, p: 0.2, k: 0.8,
        ph: 6.0,
        zersetzung: '2-4 Wochen',
        ca: 0.3, s: 0.2, mg: 0.1,
        sonstiges: ['Fe']
    },
    holzasche: {
        name: 'Holzasche',
        n: 0.0, p: 1.5, k: 7.0,
        ph: 11.0,
        zersetzung: '2-4 Wochen',
        ca: 15, mg: 5, si: 8,
        sonstiges: ['S', 'B', 'Mn']
    },
    stroh: {
        name: 'Stroh',
        n: 0.5, p: 0.15, k: 0.6,
        ph: 7.0,
        zersetzung: '6-12 Monate',
        si: 10, ca: 0.3, mg: 0.2,
        sonstiges: ['Fe', 'Mn']
    },
    rindenmulch: {
        name: 'Rindenmulch',
        n: 0.2, p: 0.1, k: 0.1,
        ph: 5.5,
        zersetzung: '1-3 Jahre',
        ca: 0.3, mg: 0.1, fe: 0.02,
        sonstiges: ['Mn']
    },
    teebeutel: {
        name: 'Teebeutel',
        n: 1.5, p: 0.2, k: 0.4,
        ph: 6.0,
        zersetzung: '2-4 Wochen',
        ca: 0.3, mg: 0.2, fe: 0.03,
        sonstiges: ['Mn']
    },
    brotjauche: {
        name: 'Brotjauche',
        n: 0.5, p: 0.1, k: 0.3,
        ph: 5.5,
        zersetzung: '1-2 Wochen (flüssig)',
        mg: 0.1, ca: 0.1, fe: 0.02,
        sonstiges: ['Mn']
    },
    muscheln: {
        name: 'Muscheln',
        n: 0.1, p: 0.1, k: 0.1,
        ph: 8.0,
        zersetzung: '1-2 Jahre',
        ca: 30, mg: 0.5, fe: 0.05,
        sonstiges: ['Zn', 'Cu', 'I', 'Se']
    },
    kartoffelwasser: {
        name: 'Kartoffelwasser',
        n: 0.3, p: 0.1, k: 1.5,
        ph: 6.0,
        zersetzung: 'Sofort (flüssig)',
        ca: 0.1, mg: 0.1, k: 1.5,
        sonstiges: []
    },
    aquariumwasser: {
        name: 'Aquariumwasser',
        n: 0.5, p: 0.3, k: 0.5,
        ph: 7.0,
        zersetzung: 'Sofort (flüssig)',
        ca: 0.2, mg: 0.1, fe: 0.02,
        sonstiges: ['Mn']
    },
    moos: {
        name: 'Moos',
        n: 0.8, p: 0.2, k: 0.4,
        ph: 5.5,
        zersetzung: '3-6 Monate',
        ca: 0.5, mg: 0.3, fe: 0.04,
        sonstiges: ['Mn', 'B']
    },
    haselnussschale: {
        name: 'Haselnussschale',
        n: 0.3, p: 0.1, k: 0.2,
        ph: 7.0,
        zersetzung: '2-4 Monate',
        ca: 0.4, mg: 0.2, fe: 0.03,
        sonstiges: ['Mn']
    },
    schafwolle: {
        name: 'Schafwolle',
        n: 5.5, p: 3.0, k: 2.0,
        ph: 7.0,
        zersetzung: '6-12 Monate',
        s: 2.0, ca: 0.3, mg: 0.2,
        sonstiges: []
    },
    walnussschale: {
        name: 'Walnussschale',
        n: 0.3, p: 0.1, k: 0.2,
        ph: 7.0,
        zersetzung: '3-6 Monate',
        ca: 0.3, mg: 0.1, fe: 0.02,
        sonstiges: ['Mn']
    },
    holzspäne: {
        name: 'Holzspäne',
        n: 0.2, p: 0.1, k: 0.1,
        ph: 5.5,
        zersetzung: '4-6 Monate',
        ca: 0.2, mg: 0.1, fe: 0.02,
        sonstiges: ['Mn']
    },
    minerallwasser: {
        name: 'Minerallwasser',
        n: 0.0, p: 0.0, k: 0.1,
        ph: 7.5,
        zersetzung: 'Sofort (flüssig)',
        ca: 100, mg: 30, na: 15,
        sonstiges: ['HCO₃']
    },
    pistazienschale: {
        name: 'Pistazienschale',
        n: 0.3, p: 0.1, k: 0.2,
        ph: 7.0,
        zersetzung: '2-3 Monate',
        ca: 0.4, mg: 0.2, fe: 0.03,
        sonstiges: ['Mn']
    },
    wurmhumus: {
        name: 'Wurmhumus',
        n: 1.5, p: 0.9, k: 0.8,
        ph: 7.0,
        zersetzung: 'Bereits zersetzt',
        ca: 1.0, mg: 0.5, fe: 0.05,
        sonstiges: ['Mn', 'Zn', 'Cu', 'B']
    },
    eierschale: {
        name: 'Eierschale',
        n: 1.19, p: 0.38, k: 0.14,
        ph: 8.0,
        zersetzung: '1-2 Monate',
        ca: 35, s: 0.5, mg: 0.3,
        sonstiges: ['Mn', 'Fe', 'Zn', 'Cu', 'I', 'Se', 'Sr']
    },
    pferdemist: {
        name: 'Pferdemist',
        n: 0.7, p: 0.3, k: 0.6,
        ph: 8.0,
        zersetzung: '1-2 Monate',
        ca: 1.0, s: 0.3, mg: 0.4,
        sonstiges: ['Fe', 'Mn', 'Cu', 'Zn', 'B', 'Mo', 'Na']
    },
    rasenschnitt: {
        name: 'Rasenschnitt',
        n: 3.0, p: 0.5, k: 1.5,
        ph: 6.5,
        zersetzung: '1-2 Wochen',
        si: 5, ca: 0.3, mg: 0.2,
        sonstiges: ['Fe', 'Mn']
    },
    hefe: {
        name: 'Hefe',
        n: 7.0, p: 1.0, k: 0.5,
        ph: 6.0,
        zersetzung: '1-2 Wochen',
        s: 1.0, mg: 0.3, ca: 0.1,
        sonstiges: ['Zn', 'Fe', 'Cu', 'Mn']
    },
    melonenschale: {
        name: 'Melonenschale',
        n: 0.5, p: 0.2, k: 1.2,
        ph: 6.0,
        zersetzung: '2-4 Wochen',
        ca: 0.3, mg: 0.2, fe: 0.03,
        sonstiges: ['Mn']
    },
    kuhmist: {
        name: 'Kuhmist',
        n: 0.6, p: 0.4, k: 0.5,
        ph: 7.0,
        zersetzung: '2-3 Monate',
        ca: 1.0, s: 0.3, mg: 0.4,
        sonstiges: ['Fe', 'Mn', 'Cu', 'Zn']
    },
    maiskolben: {
        name: 'Maiskolben',
        n: 0.3, p: 0.2, k: 0.4,
        ph: 6.5,
        zersetzung: '2-4 Wochen',
        si: 3, ca: 0.2, mg: 0.1,
        sonstiges: ['Fe', 'Mn']
    },
};   