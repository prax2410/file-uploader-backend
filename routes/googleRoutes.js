const express = require("express");
const router = express.Router();

const db = require("../Database/db");

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

router.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email } = ticket.getPayload();    
    // const user = await db.user.upsert({
    //     where: { email: email },
    //     update: { name, picture },
    //     create: { name, email, picture }
    // });
    const user = await db.none(
        `INSERT INTO users_table (name, email) VALUES ($1, $2)`,
        [
            name,
            email
        ]
    );
    
    req.session.userId = user.id;

    res.status(201)
    res.json(user)
});

router.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
});

router.get("/loggedInUser", async (req, res) => {
    res.status(200)
    res.json(req.user)
});

module.exports = router;