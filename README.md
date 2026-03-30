# Campus Nutrition Mongo Project

## Description
This project models a campus dining nutrition system using MongoDB. It stores menu data and user activity in a document-based structure.

## Collections
- users
- menuSnapshots

Link for ERD LucidChart: https://lucid.app/lucidchart/9ebd0c1f-d7f3-420a-a49f-7cb24dadc9d7/edit?viewport_loc=2091%2C-3355%2C3259%2C1478%2C0_0&invitationId=inv_66bee794-734e-433f-9490-70e7b85bd004

---

## Setup

Run the following command to initialize the database:

```bash
mongosh < init.js
```

---

## Data Files Included

- `menuSnapshots.json` (Extended JSON)
- `users.json` (Extended JSON)
- `menuSnapshots.csv`
- `users.csv`

---

## Import With mongoimport

Use these commands if you want to load JSON files directly instead of running init.js:

```bash
mongoimport --db campusNutrition --collection menuSnapshots --file menuSnapshots.json --jsonArray --drop
mongoimport --db campusNutrition --collection users --file users.json --jsonArray --drop
```

You can also import CSV files:

```bash
mongoimport --db campusNutrition --collection menuSnapshots --type csv --headerline --file menuSnapshots.csv --drop
mongoimport --db campusNutrition --collection users --type csv --headerline --file users.csv --drop
```

---

## Import With MongoDB Compass

1. Open MongoDB Compass and connect to your local instance.
2. Create or select database `campusNutrition`.
3. Open collection `menuSnapshots` and click Add Data > Import File.
4. Choose `menuSnapshots.json` with JSON format, or `menuSnapshots.csv` with CSV format.
5. Repeat for `users` collection using `users.json` or `users.csv`.

---

## Dump and Restore

A pre-populated dump is included in `/dump/campusNutrition/` containing 5 users and 5 menu snapshots with full embedded data.

To restore the database from the dump, run:

```bash
mongorestore --db campusNutrition --drop ./dump/campusNutrition
```

To create a new dump from your loaded database:

```bash
mongodump --db campusNutrition --out ./dump
```

---

## Node + Express App

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally on port 27017.

3. Initialize the database:
```bash
mongosh < init.js
```

4. Start the server:
```bash
node app.js
```

5. Open your browser and go to: `http://localhost:3000`

---

## Queries

Run each query using the following commands:

```bash
mongosh < query1.js
mongosh < query2.js
mongosh < query3.js
mongosh < query4.js
mongosh < query5.js
```

---

## Notes
- `menuSnapshots` stores dining hall menus with embedded items and nutrition data.
- `users` stores user data including goals, meal plans, and consumption history.
