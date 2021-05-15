const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');
let RedisStore = require('connect-redis')(session);


const { MONGO_PASS, MONGO_USER, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require('./config/config');
const postRouter = require('./routes/postroutes')

const userRouter = require('./routes/userroutes')
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})
const app = express();

const port = process.env.PORT || 3000;
const connectWithRetry = () => {
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authsource=admin`)
        .then(() => console.log("successfully connected successfully"))
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 5000)
        })
}


connectWithRetry();

app.enable("trust proxy")
app.use(cors({}))
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }

}))

app.use(express.json());
app.get('/api/v1', (req, res) => {
    console.log("hey there ");
    res.send("Hello chinna satwik!!!");
})
app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
})
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);