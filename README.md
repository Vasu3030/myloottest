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