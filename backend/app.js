import authRoutes from './routes/authRoutes.js'
import digiRoutes from './routes/digiRoutes.js'
import express, { json, urlencoded as _urlencoded } from 'express'
import { set, connect } from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'

const app=express()

config()

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST","PUT","DELETE"]
    })
)

app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));
app.get('/', (req, res) => {
    res.send('Api is running!')
})

const PORT = 5000;
const IP_ADDRESS = '192.168.1.14';

const dbURI = 'mongodb+srv://grumpy:test123456@cluster0.0ms9mco.mongodb.net/digitalCard?retryWrites=true&w=majority';
connect(dbURI)
    .then((result) => {
        console.log("connected to mongo db")
        return app.listen(PORT, IP_ADDRESS, () => {
            console.log(`Express server is running at http://${IP_ADDRESS}:${PORT}`);
          })})
    .catch((err) => console.log(err))

    http://192.168.1.14:3000
app.use('/', authRoutes)
app.use('/', digiRoutes)


app.use((req, res, next) => {
    const error = new Error(`Not Found -${req.originalUrl}`)
    res.status(404)
    next(error)
})


app.use((err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message
    })
    next()
})


