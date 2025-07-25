# Sommaire

- [Présentation](#présentation)
- [Instructions et installations](#instructions-et-installations)
- [Modélisation et Base de Données](#modélisation-et-base-de-données)
  - [Choix de la structure](#1-choix-de-la-structure)
  - [Relations](#2-relations)
- [Gestion des performances](#gestion-des-performances)
  - [Indexation](#1-indexation)
  - [Prisma](#2-prisma)
  - [Pagination](#3-pagination)
- [API Endpoints](#api-endpoints)


 # Présentation

- Affiche le classement des teams avec leurs infos (nom, nombre de users, nombre de coins total).

- Affiche le classement des users d'une team avec leur contribution en coins, possibilité de mettre un filtre sur la date.

- Affiche les détails d'un user ainsi que sa team

- Possibilité d'ajouter des coins à un user



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

## 2. Relations

### Relation entre `users` et `teams`

- Un **user** appartient à **une seule team** (`many-to-one`).
- Une **team** peut avoir **plusieurs users** (`one-to-many`).

---

### Relation entre `coin_earnings` et `users`

- Un **coin_earning** est toujours associé à **un user** (`many-to-one`).
- Un **user** peut avoir **plusieurs coin_earnings** (`one-to-many`).

---

### Relation entre `coin_earnings` et `teams`

- Un **coin_earning** est également lié directement à **une team** (`many-to-one`) pour historiser la contribution même si l’utilisateur change d’équipe plus tard.
- Une **team** peut avoir **plusieurs coin_earnings** (`one-to-many`).


# Gestion des performances
## 1. Indexation

- coin_earnings.user_id

- coin_earnings.team_id

- coin_earnings.timestamp

Les colonnes ci dessus seront souvent utilisées pour des clauses `WHERE` d'où l'indexation

## 2. Prisma

On utilise Prisma comme ORM car il apporte plusieurs avantages de performance et de productivité :

- **Migrations structurées** : Prisma gère automatiquement les migrations et garantit que le schéma reste cohérent.
- **Requêtes optimisées** : Prisma génère des requêtes SQL efficaces basées sur le schéma typé, ce qui évite beaucoup d’erreurs.

Cependant, dans certains cas où **Prisma ne supporte pas certaines fonctions SQL avancées** (comme certains agrégats spécifiques ou des jointures complexes),  
j’ai recours à `prisma.$queryRaw` pour exécuter directement du SQL brut et **laisser la base effectuer le calcul**.  
Cela permet de conserver des performances élevées tout en profitant de Prisma pour le reste du projet.

## 3. Pagination

Pour éviter de charger trop de données en mémoire et améliorer la performance des endpoints listant des utilisateurs ou des gains,  
la pagination est appliquée via des paramètres `page` et `pageSize`, ils restent facultatifs.  

- Ces paramètres sont **validés** pour éviter des valeurs invalides.
- Cela réduit la charge sur la base en cas d'un grand nombre de données (scalable).


# API Endpoints

## 1. Liste des users d'une équipe avec leur contribution en coins

- **Method**: GET
    
- **URL**: `http://localhost:3000/teams/{teamId}/stats`
    
- **Query Paramètres (facultatif)**:
    
    - `page` (number): Le numéro de page.
        
    - `pageSize` (number): Le nombre de résultat par page.
        

### Réponse

- **Status Code**: 200 OK
    
- **Content-Type**: application/json
    

#### Réponse JSON

``` json
{
  "status": number,
  "name": string,
  "page": number,
  "pageSize": number,
  "total": number,
  "totalPages": number,
  "totalCoins": number,
  "users": [
    {
      "userId": number,
      "pseudo": string,
      "amount": number,
      "percentage": number
    }
  ]
}

 ```


 ## 2. Liste des users d'une équipe avec leur contribution en coins pendant une période

- **Method:** GET  

- **URL:** `http://localhost:3000/teams/{teamId}/leaderboard`

- **Query Paramètres (facultatif pour page et pageSize)**:

- `from` (string, required): Date de début `YYYY-MM-DD` format.
    
- `to` (string, required): Date de fin `YYYY-MM-DD` format.
    
- `page` (number): Le numéro de page.
        
- `pageSize` (number): Le nombre de résultat par page.
    

### Réponse

- **Status Code**: 200 OK
    
- **Content-Type**: application/json

#### Réponse JSON

``` json
{
  "status": number,
  "name": string,
  "page": number,
  "pageSize": number,
  "total": number,
  "totalPages": number,
  "totalCoins": number,
  "users": [
    {
      "userId": number,
      "pseudo": string,
      "amount": number,
      "percentage": number
    }
  ]
}

 ```

 ## 3. Liste de toutes les teams avec le nombre de coins total et de membres


- **Method:** GET  

- **URL:** `http://localhost:3000/teams`

- **Query Paramètres (facultatif)**:
    
- `page` (number): Le numéro de page.
        
- `pageSize` (number): Le nombre de résultat par page.
    

### Réponse

- **Status Code**: 200 OK
    
- **Content-Type**: application/json

#### Réponse JSON

``` json
{
  "status": number,
  "page": number,
  "pageSize": number,
  "total": number,
  "totalPages": number,
  "teams": [
    {
      "id": number,
      "name": string,
      "totalCoins": number,
      "activeUsers": number
    }
  ]
}

 ```

 ## 4. Informations du user avec sa contribution et son équipe

- **Method**: GET
    
- **URL**: `http://localhost:3000/users/{userId}`
    

### Response

- **Status Code**: 200 OK
    
- **Content-Type**: application/json
    

#### Response JSON

``` json
{
  "id": number,
  "pseudo": string,
  "status": boolean,
  "team": {
    "id": number,
    "name": string,
    "totalCoins": number,
    "activeUsers": number
  },
  "earningsSum": number,
  "percentage": number
}

 ```

 ## 5. Ajout de coins à un user

- **Method**: POST

- **URL**: `http://localhost:3000/coins/`
    
- **Content-Type**: application/json
    

- **Body Paramètres**:

- **userId** (number, required)
    
- **teamId** (number, required)
    
- **amount** (number, required) > 0
    

**Exemple Body:**

``` json
{
  "userId": 121,
  "teamId": 11,
  "amount": 1
}

 ```

### Réponse

- **Status Code**: 201 CREATED
    
- **Content-Type**: application/json

#### Réponse JSON

``` json
{
  "status": number,
  "data": {
    "id": number,
    "userId": number,
    "teamId": number,
    "amount": number,
    "timestamp": Date
  }
}

 ```