const express = require('express');

const app = express();
const PORT = 8000;


app.get("/", (req, res) => {
    res.send("Hello this is home page")
})

app.listen(PORT, () => {
    console.log(`Server started at PORT: http://localhost:${PORT}`);
})