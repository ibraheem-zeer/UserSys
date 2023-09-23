import express from "express"
import jwt from "jsonwebtoken"
import { User } from "../../db/entities/User.js";

const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const token = req.headers["authorization"] || ""
    let validToken;
    // entry => adfdasf , DB => 
    try {
        validToken = jwt.verify(token, process.env.SECRET_KEY || "")
    } catch (error) {

    }
    console.log(token);
    if (validToken) {
        let decoded = jwt.decode(token, { json: true })
        const user = await User.findOneBy({ email: decoded?.email })    // ask waleed
        res.locals.user = user      // what is locals ? it like container in res we cab sort what we want
        next()
    } else {
        res.status(401).send("you are unauthorized")
    }
}

export { auth }