# Carnet Reflux — version installable (PWA)

Application autonome : les données restent dans le téléphone, rien n'est envoyé
à un serveur. Une fois installée, elle fonctionne hors ligne.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | l'application entière (interface, saisie, analyse) |
| `sw.js` | met l'app en cache pour le fonctionnement hors ligne |
| `manifest.webmanifest` | nom, couleurs, mode plein écran |
| `icon-192.png`, `icon-180.png` | icône sur l'écran d'accueil |

Les quatre fichiers doivent rester **dans le même dossier**, à la racine du site.

## Mise en ligne sur GitHub Pages (gratuit, ~10 min)

1. Créer un compte sur github.com si besoin.
2. **New repository** → nom : `carnet` → **Public** → *Create repository*.
   (Le dépôt doit être public pour que Pages fonctionne gratuitement ; le code
   est visible, les données de santé ne le sont jamais — elles ne quittent pas
   le téléphone.)
3. **uploading an existing file** → glisser les 5 fichiers de ce dossier →
   *Commit changes*.
4. **Settings** → **Pages** → Source : *Deploy from a branch*, Branch : `main`,
   dossier `/ (root)` → *Save*.
5. Attendre 1 à 2 minutes. L'adresse est affichée en haut de la page Pages :
   `https://<votre-compte>.github.io/carnet/`

C'est ce lien à envoyer. HTTPS est fourni par GitHub, ce qui est nécessaire
pour le mode hors ligne.

## Installation sur iPhone

1. Ouvrir le lien **dans Safari**.
2. Bouton **Partager** → **Sur l'écran d'accueil** → **Ajouter**.
3. Ouvrir l'app **par l'icône**, et noter uniquement là.

L'app installée a son propre espace de stockage, séparé de Safari et non
soumis à l'effacement automatique au bout de 7 jours. Ce qui aurait été noté
dans Safari avant l'installation ne suit pas : installer d'abord, noter ensuite.

## Mettre à jour l'app plus tard

Remplacer `index.html` dans le dépôt, puis changer la ligne `const CACHE =
"reflux-v2"` de `sw.js` en `"reflux-v3"`. Sans ce changement, les téléphones
gardent la version en cache. Les données déjà saisies sont conservées.

## Sauvegarde

Onglet **Calendrier** → *Mes données* → **Sauvegarder** produit un fichier
`.json` à garder dans Fichiers, iCloud ou par mail. **Restaurer** le relit,
sur le même téléphone ou sur un nouveau. Supprimer l'icône efface les données :
la sauvegarde est le seul filet.

## Autre hébergement

N'importe quel hébergeur de fichiers statiques en HTTPS convient (Netlify,
Cloudflare Pages, Vercel, ou un espace web personnel) : déposer les mêmes
fichiers à la racine.
