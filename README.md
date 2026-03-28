# Campus Nutrition Mongo Project

## Description
This project models a campus dining nutrition system using MongoDB. It stores menu data and user activity in a document-based structure.

## Collections
- users
- menuSnapshots

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

Create a dump from your loaded database:

mongodump --db campusNutrition --out ./dump

Restore from dump:

mongorestore --db campusNutrition --drop ./dump/campusNutrition

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
