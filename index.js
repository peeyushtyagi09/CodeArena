const express = require("express");
const env = require("./example_env");
const cors = require("cors");
const helmet = require("helmet");

// files
const { connectDB } = require("./db/db");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


// calling mongodb function
connectDB();

app.get("/", (req, res) => {
    console.log("That is working");
})

const port = env.PORT; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

