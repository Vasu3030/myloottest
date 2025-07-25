# Instructions et installations

## 1. Cloner le projet et aller dans /server

```bash
git clone https://github.com/Vasu3030/myloottest.git
cd myloottest/server
```

## 2. Server - API

Copier `.env.example` en `.env` puis modifier les infos de connexion à la base de données et le `port` si besoin (par défaut `PORT=3000`) :

```bash
cp .env.example .env
```

Installer les dépendances Node.js, créer la bdd et insérer des seeders :

```bash 
npm install
npx prisma migrate dev
npm run seed
```

Démarrer le serveur :

```bash
npm run dev
```

## 3. Client - Interface web

Sur un autre terminal aller dans le dossier /client

```bash
cd myloottest/client
```

Copier `.env.example` en `.env` puis modifier l'url de l'API si besoin (par défaut `PORT=3000`) :

```bash
cp .env.example .env
```

Remarque : Si vous avez changé le port dans le `.env` du serveur alors il faut le changer ici aussi

Installer les dépendances et lancer le front :

```bash
npm install
npm run dev
```
## 4. Accès

Si vous n'avez pas changé le `port` dans les `.env` alors :
- l'api est accessible ici : http://localhost:3000/
- le front est accessible sur votre navigateur ici : http://localhost:5173/


# Modélisation et Base de Données
## 1. Choix de la structure
### users :

- id (PK) number

- pseudo string

- status boolean pour un soft delete si besoin plus tard

- team_id (FK vers teams) number

- created_at et updated_at (bonne pratique) Date

### teams :

- id (PK) number

- name string

- created_at et updated_at (bonne pratique) Date

### coin_earnings : 

- id (PK) number

- user_id (FK vers users) number

- team_id (FK redondante pour historiser si un user change de team) number

- amount number

- timestamp Date

#### Pourquoi cette structure ?
Normalisation : séparation claire entre utilisateurs, équipes et gains.

Historisation : coin_earnings conserve chaque gain avec sa date.

Optimisation des requêtes : la présence de team_id dans coin_earnings évite des jointures coûteuses sur users pour calculer les totaux par équipe.

## 2. Gestion des performances
### Indexation

- coin_earnings.user_id

- coin_earnings.team_id

- coin_earnings.timestamp

Les colonnes ci dessus seront souvent utilisé pour des clauses `WHERE` d'où l'indexation

### Prisma

On utilise Prisma comme ORM car il apporte plusieurs avantages de performance et de productivité :

- **Migrations structurées** : Prisma gère automatiquement les migrations et garantit que le schéma reste cohérent.
- **Requêtes optimisées** : Prisma génère des requêtes SQL efficaces basées sur le schéma typé, ce qui évite beaucoup d’erreurs.

Cependant, dans certains cas où **Prisma ne supporte pas certaines fonctions SQL avancées** (comme certains agrégats spécifiques ou des jointures complexes),  
j’ai recours à `prisma.$queryRaw` pour exécuter directement du SQL brut et **laisser la base effectuer le calcul**.  
Cela permet de conserver des performances élevées tout en profitant de Prisma pour le reste du projet.

