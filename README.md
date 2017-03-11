# BookAPI

## Instructions.

1. Install Node and npm.
2. Set up mongoDB on your machine.
3. Add seed data which is provided in the /data directory. Import the data to MongoDB with the following command:
```
mongoimport -db bookAPI --collection books --file data/seed.json --jsonArray
```
4. Run the server.
```
node app.js
```
5. Go to http://127.0.0.1:3000/api/books/.
