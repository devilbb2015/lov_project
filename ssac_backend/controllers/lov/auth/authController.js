const user = require("../../../models/user");
const jwtModule = require("../../../modules/jwtModule");
const code = require("../../../modules/statusCode");

const authController = {
  readUser: (req, res) => {},
  updateUser: (req, res) => {},
  deleteUser: (req, res) => {},
  readAllUser: (req, res) => {},

  signUpUser: async (req, res) => {
    const { email, password, nickName } = req.body;

    try {
      const result = await user.findOne({ email });

      if (!result) {
        const userModel = new user({
          email,
          password,
          nickName,
        });
        await userModel.save();
        res.status(code.OK).json({
          message: "회원가입 성공",
        });
      } else {
        res.status(code.CONFLICT).json({
          message: "중복된 아이디",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "DB 서버 에러",
      });
    }
  },
  signInUser: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
      const result = await user.findOne({ email, password });
      if (result) {
        const payload = {
          email: result.email,
          nickName: result.nickName,
          verified: result.verified,
        };

        const token = jwtModule.create(payload);
        console.log(token);
        console.log(result._id);

        res.status(code.OK).json({
          message: "로그인 성공",
          accessToken: token,
        });
      } else {
        res.status(code.CONFLICT).json({
          message: "로그인 실패",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "DB 서버 에러",
      });
    }
  },
};

module.exports = authController;
