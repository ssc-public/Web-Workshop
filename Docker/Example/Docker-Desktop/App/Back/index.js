const express = require('express');

const app = express();
app.use(express.static('public'));
app.listen(3000, () => console.log('Node backend is Running!'));

app.get("/node/time", (req, res) => {
    console.log("request received for time");
    var t = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0];
    res.send(`${t}`);
})