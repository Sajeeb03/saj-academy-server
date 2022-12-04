const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);

app.use(cors());
app.use(express.json());

const port = process.env.Port || 5000;

const courses = require('./data/courses.json')

app.get('/', (req, res) => {
    res.send("Learning-platform-server is running")
})

app.get("/courses", (req, res) => {
    res.send(courses)
})

app.get("/courses/:id", (req, res) => {
    const id = req.params.id;
    const course = courses.find(cr => cr.id === id)
    res.send(course)
})

//
app.post("/create-payment-intent", async (req, res) => {
    const { total } = req.body;
    // console.log(total)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true
            }
        })
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }

})

app.listen(port, () => {
    console.log("Server is running at port:", port);
})