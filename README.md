# Integracja systemów informatycznych lab. 2 - blog-app

## Wymagania

- Node.js w wersji 22 lub nowszej
- npm

## Uruchamianie projektu

1. Sklonuj repozytorium:
```bash
   git clone https://github.com/GPrzyborowski/blog-app.git
   cd blog-app
```

2. Zainstaluj zależności:
```bash
   npm install
```

3. Utwórz plik `.env` w głównym folderze projektu z zawartością:
```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="dowolny_sekretny_ciag_znakow"
```

4. Wykonaj migrację bazy danych i wygeneruj klienta Prismy:
```bash
   npx prisma migrate dev
   npx prisma generate
```

5. Wypełnij bazę danych przykładowymi danymi:
```bash
   node prisma/seed.js
```

6. Uruchom aplikację:
```bash
   npm run dev
```

7. (opcjonalnie) Wyświetlanie interfejsu bazy danych:
```bash
   npx prisma studio
```

Aplikacja dostępna pod adresem `http://localhost:3000`.  
Dane logowania: login `admin`, hasło `admin`.