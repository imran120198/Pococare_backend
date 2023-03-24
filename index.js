const express = require("express");
const { connection } = require("./Config/db");
const { authentication } = require("./middlewares/Authentication");
const { userRouter } = require("./Routes/User.route");
const cors = require("cors");

const app = express();

const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my homepage");
});

app.use(cors());
app.use("/user", userRouter);

app.use(authentication);

app.use("/note",(req,res) => {
    res.send("Going..")
})

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to database");
    console.log(error);
  }
  console.log(`Server is running on ${PORT}`);
});
