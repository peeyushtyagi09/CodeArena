const express = require("express");
const env = require("./example_env");
const cors = require("cors");
const helmet = require("helmet");

// files
const { connectDB } = require("./db/db");
const { globalLimiter } = require("./middleware/ratelimiter");
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/adminProblemRoutes.js");

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
app.use("/api/ai", problemRoutes);
console.log("env.AI_API_KEY", env.AI_API_KEY);


const port = env.PORT; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

