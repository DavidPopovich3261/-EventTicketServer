import express, { json } from "express"
import { verification } from "./middleware/verification.js"
import { userRoute } from "./routers/userRoute.js"
import { register } from "./routers/register.js"
import { event } from "./routers/creatorRoute.js"
const app = express()
const port = 8000

app.use(express.json())
app.use("/users", verification, userRoute)
app.use("/user", register)
app.use("/", verification, event)

app.listen(port, (req, res) => {
    console.log("server run ...");
})