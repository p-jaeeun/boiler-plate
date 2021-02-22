const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // ex) 유저가 john ahn@naver.com라고 입력하면  trim이 공백을 없애줌
  },
  password: {
    type: String,
    maxlength: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number, // 번호로 역할 구분 (관리자 ,고객..)
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: String,
  },
});

// model이 schema를 감싼다
const User = mongoose.model("User", userSchema);

module.exports = { User };
