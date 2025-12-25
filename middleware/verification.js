import { readFile } from "../utils/functionUtils.js"


export async function verification(req, res, next) {
    let users =await readFile("./data/users.json")
    for (let user of users) {
        if(user.username ==req.headers.username && user.password == req.headers.password){            
            next()
            return
        }res.status(404).send("User does not exist")
    }
}