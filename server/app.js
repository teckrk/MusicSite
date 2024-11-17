const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require("mongoose");
require("dotenv/config")

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json("hai there....")
})

//  user authentication route
const userRoute = require('./routes/auth');
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artist");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);


mongoose.connect("mongodb://localhost:27017/musicapp")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// mongoose.connect(process.env.DB_STRING)
mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.log(`ERROR: ${error}`)
  })
app.listen(4000, () => console.log("Listening on port 4000"));