const puppeteer = require('puppeteer');

(async () => {
    let browser;
    let page;

    // Fonction pour ouvrir une URL et fermer l'ancien onglet
    const openUrlEvery15Minutes = async (url) => {
        // Lance un navigateur si ce n'est pas déjà fait
        if (!browser) {
            browser = await puppeteer.launch({ headless: false }); // headless: false pour voir le navigateur
        }

        // Ferme l'ancien onglet si existant
        if (page) {
            await page.close();
        }

        // Ouvre un nouvel onglet et accède à l'URL
        page = await browser.newPage();
        await page.goto(url);

        console.log(`Ouvert : ${url} à ${new Date().toLocaleTimeString()}`);
    };

    const url = 'https://example.com'; 
    const interval = 15 * 60 * 1000; // timer

    // Ouvre une URL pour la première fois
    await openUrlEvery15Minutes(url);

    // Configure l'intervalle pour répéter toutes les timer
    setInterval(() => openUrlEvery15Minutes(url), interval);
})();
