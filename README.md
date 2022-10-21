![Logo](https://i.ibb.co/hswYHLG/logo-api.png)

# Kartky API - your best to-do lists

Karty to system do list zadań napisany w **Node.js** przy użyciu **express.js** i **TypeScript**. Używana baza danych to **MariaDB** z podpiętym **[Prisma ORM](https://www.prisma.io/docs/getting-started)**. Do wysyłki maili **wymagane** jest skonfigurowanie SMTP.

Uruchomienie projektu:

```
npm i
npm run dev
```

Utworzenie bazy danych, tabel w bazie i uruchomienie projektu ( serwer bazodanowy **musi być włączony** np. **[MariaDB w Dockerze](https://hub.docker.com/_/mariadb)** ):

```
cd src
npx prisma migrate dev --name init
cd ..
npm run dev
```

## Lista funkcjonalności

### Ukończone

-   [x] Logowanie
-   [x] Rejestracja
-   [x] Resetowanie hasła
-   [x] Potwierdzanie konta
-   [x] Wylogowywanie
-   [x] Autoryzacja przy użyciu JWT
-   [x] Obsługa SMTP

### W trakcie

-   [ ] CRUD actions dla list zadań
-   [ ] CRUD actions dla grup list zadań
