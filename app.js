require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

const document = require('./routes/documents');
const mailer = require('./routes/mail');
const auth = require("./routes/auth.js");
const docsModel = require("./models/docsModel")

const app = express();
const httpServer = require("http").createServer(app);

const port = process.env.DBWEBB_PORT || 1337;

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

const visual = false;
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema
} = require("graphql");

const RootQueryType = require("./graphql/root.js");

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/documents', document);
app.use("/auth", auth);
app.use("/mail", mailer);

app.get('/', (req, res) => {
    res.json({
        msg: "index",
    });
});

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual, // Visual är satt till true under utveckling
}));


const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"] 
    }
    });

io.sockets.on('connection', function(socket) {
    console.log(socket.id); // Nått lång och slumpat

    socket.on("content", function(data) {
        socket.broadcast.emit("content", data);

        docsModel.updateDoc(data);
    });
});

// Leave untouched

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
const server = httpServer.listen(port, () => {
    console.log('documents api listening on port ' + port);
});

module.exports = server;