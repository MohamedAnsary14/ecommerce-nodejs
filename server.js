import express from 'express'
import { dbconnection } from './databases/dbconnections.js'
import { bootstrap } from './src/modules/index.routes.js'
import dotenv from "dotenv"
import cors from "cors"
import { creatOnlineSession } from './src/modules/order/order.controller.js'
dotenv.config()
const app = express()
const port = 3000
app.use(cors())
app.post('/webhook', express.raw({ type: 'application/json' },creatOnlineSession),)
app.use(express.json())
app.use('/uploads', express.static('uploads'))









bootstrap(app)
dbconnection()

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))