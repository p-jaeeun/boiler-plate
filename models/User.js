const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // ex) 유저가 john ahn@naver.com라고 입력하면  trim이 공백을 없애줌
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
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
    type: Number,
  },
});

// 몽구스 메서드 유저정보를 저장하기 전에 함수 수행
userSchema.pre("save", function (next) {
  var user = this; //위에있는 user를 가르킴.

  // 유저가 비밀번호를 변경했을 때
  if (user.isModified("password")) {
    // 비밀번호를 암호화시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // hash : 암호화된 비밀번호
        next();
      });
    });
  } else {
    // 유저가 비밀번호가 아닌 다른 정보를 변경했을 경우,
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  // 입력한 비밀번호와, 복호화된 비밀번호 비교하기
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch); // err없고, isMatch=true
    }
  });
};

userSchema.methods.generateToken = function (callback) {
  var user = this; //es5문법
  // console.log("user._id", user._id);
  // jsonwebtoken 이용해서 token 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  // user._id + "secretToken" = token
  // -> 'secretToken' -> user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) {
      return callback(err);
    } else callback(null, user);
  });
};

userSchema.statics.findBToken = function (token, callback) {
  var user = this;

  // token을 decode한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용어서 유저를 찾은 후
    // 클라이언트에서 가져온 token과 DB에 저장된 token이 일치하는지 확인
    user.findOne({ _id: deoded, token: token }, function (err, user) {
      if (err) {
        return callback(err);
      } else {
        callback(null, user);
      }
    });
  });
};
// model이 schema를 감싼다
const User = mongoose.model("User", userSchema);

module.exports = { User };
