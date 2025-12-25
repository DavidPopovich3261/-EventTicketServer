import express from "express"
import { readFile, writeFile } from "../utils/functionUtils.js"

export const userRoute = express()

userRoute.post("/tickets/buy", async (req, res) => {
    try {
        if (!(req.body["username"] && req.body["eventName"] && req.body["ticketsBought"])) {
            res.status(404).send("Bad parameters")
            return
        } let events = await readFile("./data/events.json")
        for (let event of events) {
            if (event.eventName == req.body.eventName) {
                if (parseInt(event.ticketsAvailable) >= parseInt(req.body.ticketsBought)) {
                    event.ticketsAvailable = (parseInt(event.ticketsAvailable) - parseInt(req.body.ticketsBought))
                    await writeFile("./data/events.json", events)
                    let receipts = await readFile("./data/receipts.json")
                    receipts.push({ "username": req.body.username, "eventName": req.body.eventName, "ticketsBought": req.body.ticketsBought })
                    await writeFile("./data/receipts.json", receipts)
                    res.status(200).json({ "message": "Tickets purchased successfully" })
                    return
                } else {
                    res.status(422).send("Not enough tickets")
                }
            }
        } { res.status(404).send("Event not found") }
    } catch (error) {
        console.error(error);
    }
})

userRoute.get("/:username/summary", async (req, res) => {
    try {
        let receipts = await readFile("./data/receipts.json")
        let summary = {
            "totalTicketsBought": null,
            "events": [],
            "averageTicketsPerEvent": null
        }
        for (let receipt of receipts) {
            if (receipt.username == req.params.username) {
                summary.totalTicketsBought += parseInt(receipt.ticketsBought)
                if (!(summary.events.includes(receipt.eventName))) {
                    summary.events.push(receipt.eventName)
                }
            }
        }
        summary.averageTicketsPerEvent = (summary.totalTicketsBought / summary.events.length)

        res.status(200).json(JSON.stringify(summary))
    } catch (error) {
        console.error(error);
    }
})
