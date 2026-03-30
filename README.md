# Campus Nutrition Mongo Project

## Description
This project models a campus dining nutrition system using MongoDB. It stores menu data and user activity in a document-based structure.

## Collections
- users
- menuSnapshots
Link for ERD LucidChart:https://lucid.app/lucidchart/9ebd0c1f-d7f3-420a-a49f-7cb24dadc9d7/edit?viewport_loc=2091%2C-3355%2C3259%2C1478%2C0_0&invitationId=inv_66bee794-734e-433f-9490-70e7b85bd004

## Setup

Run the following command to initialize the database:

mongosh < init.js

## Data Files Included

- menuSnapshots.json (Extended JSON)
- users.json (Extended JSON)
- menuSnapshots.csv
- users.csv

## Import With mongoimport

Use these commands if you want to load JSON files directly instead of running init.js:

mongoimport --db campusNutrition --collection menuSnapshots --file menuSnapshots.json --jsonArray --drop
mongoimport --db campusNutrition --collection users --file users.json --jsonArray --drop

You can also import CSV files:

mongoimport --db campusNutrition --collection menuSnapshots --type csv --headerline --file menuSnapshots.csv --drop
mongoimport --db campusNutrition --collection users --type csv --headerline --file users.csv --drop

## Import With MongoDB Compass

1. Open MongoDB Compass and connect to your local instance.
2. Create or select database campusNutrition.
3. Open collection menuSnapshots and click Add Data > Import File.
4. Choose menuSnapshots.json with JSON format, or menuSnapshots.csv with CSV format.
5. Repeat for users collection using users.json or users.csv.

## Dump and Restore

### Using the Provided Dump File

A pre-populated dump file is included in `/dump/campusNutrition/` with test data (6 users and 5 menu snapshots).

**Option 1: Import using mongoimport (Recommended)**

```bash
mongoimport --db campusNutrition --collection users --file dump/campusNutrition/users.json --jsonArray --upsert
mongoimport --db campusNutrition --collection menuSnapshots --file dump/campusNutrition/menuSnapshots.json --jsonArray --upsert
```

**Option 2: Import using MongoDB Compass**

1. Open MongoDB Compass
2. Connect to localhost:27017
3. Right-click on campusNutrition database → Add Collection
4. For `users`: Click Add Data → Import File → Select `dump/campusNutrition/users.json` → Import
5. For `menuSnapshots`: Click Add Data → Import File → Select `dump/campusNutrition/menuSnapshots.json` → Import

**Option 3: Create your own dump**

```bash
mongodump --db campusNutrition --out ./dump
```

**Option 4: Restore from dump**

```bash
mongorestore --db campusNutrition --drop ./dump/campusNutrition
```

## Queries

Run each query using the following commands:

mongosh < query1.js
mongosh < query2.js
mongosh < query3.js
mongosh < query4.js
mongosh < query5.js

## Notes
- menuSnapshots stores dining hall menus with embedded items and nutrition data.
- users stores user data including goals, meal plans, and consumption history.
