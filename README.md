# BookAPI
Demonstration Node.js API that sends, stores, updates and deletes books from a mongoDB server.

## Installation.

- Install Node and npm.
- Install and configure mongoDB on the server.
- Add seed data which is provided in the /data directory. Import the data to MongoDB with mongoimport:
```
mongoimport -db bookAPI --collection books --file data/seed.json --jsonArray
```
- Run the server.
```
node app.js
```

## Schema
BookAPI is accessed from the root endpoint http://127.0.0.1:3000/api/.

### Activity

#### List books
```
GET /books
```
***Example***:
```curl -H "Accept:application/json" http://0.0.0.0:8080/api/books/```

##### Parameters

|Name|Type|Description|
|--|--|--|
|title|string|Return books that match a title|
|author|string|Return books that match an author|
|genre|string|Return books that match a genre|
|id|string|Return books that match an id|

#### Add a new book

```
POST /books/
```

***Example***:

```curl -i -X POST -H "Content-Type:application/json" http://0.0.0.0:8080/api/books/ -d '{"title":"New Book", "author":"Me","genre":"REST"}'```

#### Update existing book

```
PUT /books/:bookID
```
***Example***:

```curl -v -H "Content-Type:application/json" -X PUT http://0.0.0.0:8080/api/books/58c445c04aeed82c2e7d10ac -d '{"title": "Updated Book","author": "Me","genre": "Computers", "read": false}'```

#### Update specific part of a book

```
PATCH /books/:bookID
```
***Example***:

```curl -v -H "Content-Type:application/json" -X PATCH http://0.0.0.0:8080/api/books/58c444e94aeed82c2e7d10aa -d '{"read": true}'```

#### Delete a book by id

```
DELETE /books/:bookID
```

***Example***:

```curl -v -H "Content-Type:application/json" -X DELETE http://0.0.0.0:8080/api/books/58c445b14aeed82c2e7d10ab```

### Test
```npm test```