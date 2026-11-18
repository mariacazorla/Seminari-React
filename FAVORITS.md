# Exercici de favorits

El frontend utilitza React i TypeScript. S'ha fet l'exercici de la captura: marcar i desmarcar llibres amb Nanostores.

`stores/favourites.ts` guarda els ids dels llibres marcats. `FavouriteButton.tsx` llegeix aquesta store i canvia la selecció. `FavouritesList.tsx` demana els llibres a l'API i mostra només els favorits. El botó apareix a la taula i a les targetes, i la barra de navegació té l'enllaç Favoritos. Si esborrem un llibre, també es treu de la store.

Els favorits es mantenen quan canviem de pantalla. Si recarreguem el navegador es buiden: són estat compartit en memòria, sense persistència ni comptes d'usuari.

## Arrencar

Amb MongoDB al port 27017, dins de `EA-Seminari8-React-BackOffice-API`, crea un `.env` amb `MONGO_URL=mongodb://127.0.0.1:27017/ea-seminari8-favourites` i `SERVER_PORT=1337`. Executa `npm install`, `npm run seed`, `npm run build` i `npm start`. El seed només afegeix exemples si la base està buida.

En una altra terminal, dins de `EA-Seminari8-React-BackOffice`, executa `npm install` i `npm run dev`. Obre http://localhost:5173/books.

## Provar

Marca dos llibres a Libros, entra a Favoritos i comprova que només hi són aquests dos. Treu-ne un i torna a Libros: el botó ha de quedar desmarcat. Prova també la vista de targetes. Quan treguis l'últim favorit apareixerà el missatge de llista buida.

Comprovacions del frontend: `npm test`, `npm run lint` i `npm run build`.
