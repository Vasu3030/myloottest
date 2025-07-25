# myloottest

git clone

cd myloottest/server

cp .env.example .env et mettre ses infos pour la connexion database et le port de l'api par défaut `PORT = 3000`

npm i
npx prisma migrate dev
npm run seed
npm run dev

dans le dossier myloottest/client/
cp .env.example .env et changer l'url de l'api si vous avez changez le port plus tôt
npm i
npm run dev