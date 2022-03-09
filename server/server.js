const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: '*',
}));


app.get("/", (req, res) => {
    res.json({
        message: 'App is Running'
    })
})


app.use("/api",require("./controller/LoginController"))


app.use("/api/products",require("./controller/ProductController"));

app.listen(8080, () => {
    console.log('Server is Running on port 8080');
})