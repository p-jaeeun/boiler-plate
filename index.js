// node.js 프레임워크 express로 서버 설정하기
const express = require("express");
const app = express();
const port = 3000;

// mongoDB 연결
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jaeeun:jam123@boilerplate.qysfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB is Connected..."))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
