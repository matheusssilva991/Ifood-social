const express = require("express");
const app = express();
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const cors = require("cors");

//Config
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/", routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
