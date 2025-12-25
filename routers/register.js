import express from "express"
import { readFile, writeFile } from "../utils/functionUtils.js"

export const register = express()

register.post("/register", async (req, res) => {
    try {
        let users = await readFile("./data/users.json")
        if (!(req.body.username && req.body.password)) {
            req.status(401).send("Bad parameters")
            return
        }
        for (let user of users) {
            if (user.username == req.body.username) {
                res.status(409).send("The username exists in the system")
                return
            }
        } users.push(req.body)
        await writeFile("./data/users.json", users)
        res.status(200).json({"message": "User registered successfully"}
        )
    } catch (error) {
        console.error(error);
        res.json(error)
    }
})