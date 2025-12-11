const express = require("express");
const env = require("./example_env");
const cors = require("cors");
const helmet = require("helmet");

// files
const { connectDB } = require("./db/db");
const { globalLimiter } = require("./middleware/ratelimiter");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(globalLimiter);


// calling mongodb function
connectDB();

app.get("/", (req, res) => {
    console.log("That is working");
})

// adding routes
app.use("/api/auth", authRoutes);


const port = env.PORT; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

