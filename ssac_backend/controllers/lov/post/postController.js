const post = require("../../../models/post");
const code = require("../../../modules/statusCode");

const postController = {
  readAllBoard: async (req, res) => {
    try {
      const result = await post
        .find()
        .populate("writer", "nickName profileImage");
      if (!result)
        return res.status(code.BAD_REQUEST).json({
          message: "데이터가 없습니다.",
        });

      res.status(code.OK).json({
        message: "게시물 전체조회 성공",
        data: result,
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "조회 실패",
      });
      console.log(error);
    }
  },
  createBoard: async (req, res) => {
    const userInfo = req.userInfo;
    const { title, content, category, tags } = req.body;
    const postModel = new post({
      title,
      content,
      category,
      tags,
      publishedDate: Date.now(),
      writer: userInfo._id,
    });

    try {
      const result = await postModel.save();
      res.status(code.OK).json({
        message: "저장 성공",
        data: result,
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "DB 서버 에러",
      });
      console.log(error);
    }
  },
  readBoard: async (req, res) => {
    const { postId } = req.params;
    try {
      const result = await post.findById(postId);
      if (!result) {
        return res.status(code.BAD_REQUEST).json({
          message: "데이터가 없습니다.",
        });
      }
      res.status(code.OK).json({
        message: "조회 성공",
        data: result,
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "DB 서버 에러",
      });
      console.log(error);
    }
  },
  updateBoard: async (req, res) => {
    const userInfo = req.userInfo;
    const { postId } = req.params;
    const { title, content, category, tags } = req.body;

    const ownResult = await post.checkAuth({
      postId,
      writerId: userInfo._id,
    });
    console.log(ownResult);

    if (ownResult === -1) {
      return res
        .status(code.FORBIDDEN)
        .json({ message: "접근 권한이 없습니다." });
    } else if (ownResult === -2) {
      return res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "DB 서버 에러",
      });
    }

    try {
      const result = await board.findByIdAndUpdate(
        postId,
        {
          title,
          content,
          category,
          tags,
          updatedDate: Date.now(),
          writer: userInfo._id,
        },
        { new: true } // 업데이트 하고 난 후의 결과값 반환
      );
      console.log(result);
      res.status(code.OK).json({
        message: "수정 완료",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "DB 서버 에러",
        error,
      });
    }
  },
  deleteBoard: async (req, res) => {
    const userInfo = req.userInfo;
    const { postId } = req.params;

    const ownResult = await post.checkAuth({
      postId,
      writerId: userInfo._id,
    });
    console.log(ownResult);
    if (ownResult === -1) {
      return res
        .status(code.CONFLICT)
        .json({ message: "접근 권한이 없습니다." });
    } else if (ownResult === -2) {
      return res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "DB 서버 에러",
      });
    }

    try {
      await board.findByIdAndDelete(id);
      res.status(code.OK).json({
        message: "삭제 성공",
      });
    } catch (error) {
      res.status(code.INTERNAL_SERVER_ERROR).json({
        message: "DB 서버 에러",
      });
    }
  },
};

module.exports = postController;
