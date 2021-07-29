const express = require("express");
const app = express();
const PORT = 5000;
const fs = require("fs");
const hangmanRouter = require("./modules/hangman/routerHangman");
const rpslsRouter = require("./modules/rpsls/routerRpsls");
const tatetiRouter = require("./modules/tateti/routerTateti");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/hangman", hangmanRouter);
app.use("/rpsls", rpslsRouter);
app.use("/tateti", tatetiRouter);

app.get("/", (req, res) => {
  res.send("Aguante vocaloid!");
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
