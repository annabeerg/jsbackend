# jsramverk

# Backend-API
To use the API, created for course jsramverk, clone the repository and install npm trough:

```
$ npm install
```

Endpoints:

Get all documents. (parameters none).
```
GET /
```

Add document (parameters name and content).
```
POST /
```

Get one document with ObjectId
```
GET /one/{_id}
```

To update name and content at existing ObjectId.
```
GET /update/{_id}/{name}/{content}
```

Reset database to original data. Removes all added documents.
```
GET /init
```
