// node.js 프레임워크 express로 서버 설정하기
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

// Setting bodyParser options

// application/x-www-form-unlencoded 타입을 분석해줌
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입을 분석해줌
app.use(bodyParser.json());

// mongoDB 연결
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is Connected..."))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.post("/register", (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 보내준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
