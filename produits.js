const produits = [
    { id: 1, nom: 'Clavier', categorie: 'Accessoires', prix: 120, stock: 5 },
    { id: 2, nom: 'Souris', categorie: 'Accessoires', prix: 80, stock: 8 },
    { id: 3, nom: 'Écran', categorie: 'Informatique', prix: 900, stock: 0 },
    { id: 4, nom: 'Casque', categorie: 'Accessoires', prix: 240, stock: 3 }
];

function estValide(p) {
    return Number.isFinite(p.prix) && p.prix >= 0 &&
        Number.isFinite(p.stock) && p.stock >= 0;
}

function disponibles(liste) {
    return liste.filter((p) => p.stock > 0);
}

function valeurStock(liste) {
    return liste.reduce((total, p) => total + p.prix * p.stock, 0);
}

function moinsCher(liste) {
    const dispo = disponibles(liste);
    if (dispo.length === 0) return null;
    return dispo.reduce((min, p) => (p.prix < min.prix ? p : min));
}

function resume(liste) {
    return liste.map((p) => `${p.nom} - ${p.prix} MAD - ${p.stock} unités`);
}
console.log('--- Catalogue ---');
produits.forEach((p) => console.log(`${p.nom} : ${p.prix} MAD`));

const dispo = disponibles(produits);
console.log('Produits disponibles :', dispo.length);
console.log('Valeur du stock :', valeurStock(produits), 'MAD');

const meilleur = moinsCher(produits);
if (meilleur === null) {
  console.log('Aucun produit disponible');
} else {
  const { nom, prix } = meilleur;
  console.log(`Moins cher : ${nom} (${prix} MAD)`);
}

console.log('--- Résumé ---');
resume(produits).forEach((ligne) => console.log(ligne));
console.log('--- Tests ---');

const stocksZero = produits.map((p) => ({ ...p, stock: 0 }));
console.log('Tous stocks à 0 :', disponibles(stocksZero).length, moinsCher(stocksZero));

console.log('Catalogue vide :', valeurStock([]));

console.log('Données valides :', produits.every(estValide));
