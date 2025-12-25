import express from "express"
import { readFile, writeFile } from "../utils/functionUtils.js"

export const event = express()

event.post("/creator/events", async (req, res) => {
    try {
        if (!(req.body.eventName && req.body.ticketsAvailable && req.body.username)) {
            res.status(404).send("Bad parameters")
            return
        }
        let events = await readFile("./data/events.json")
        for (let event of events) {
            if (event.eventName == req.body.eventName) {
                res.status(409).send("The event already exists")
                return
            }
        }
        let event = { "eventName": req.body.eventName, "ticketsAvailable": req.body.ticketsAvailable, "username": req.body.username }
        events.push(event)
        await writeFile("./data/events.json", events)
        res.status(200).json({ "message": "Event created successfully" })
    } catch (error) {
        console.error(error);
        res.json(error)
    }
})