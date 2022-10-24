const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const port = process.env.Port || 5000;

app.get('/', (req, res) => {
    res.send("Learning-platform-server is running")
})

app.get("/courses", (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log("Server is running at port:", port);
})