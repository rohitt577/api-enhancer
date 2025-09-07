const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Server running on port 8000");
});

app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});
