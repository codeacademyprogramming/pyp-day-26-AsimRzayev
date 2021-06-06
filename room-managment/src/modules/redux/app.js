const express = require("express"),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require("cors");

app.use(cors());
const DB = "./db.json";
const fs = require("fs");

app.get("/rooms", function (req, resp) {
    const rooms = require(DB);
    if (rooms) {
        resp.send(rooms);
    } else {
        resp.status(404).send("Not found");
    }
});
app.post("/rooms/:id", function (req, resp) {
    const roomsID = req.params.id;
    const rooms = require(DB);
    const match = rooms.find((x) => x.dataId == roomsID).reservation;

    const updatedDB = [
        ...rooms,
        
        match.push({
            id: match.length + 1,
            ...req.body,
        }),
    ];
    fs.writeFile(DB, JSON.stringify(updatedDB), () => {
        resp.json({
            
            ...req.body,
        });
    });
});
app.listen(port, () => {
    console.log("my express app");
});
