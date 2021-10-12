const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true, default: null }, // 제목
  content: { type: String, required: true, default: null }, // 내용
  category: { type: Number, default: "0" }, // 카테고리
  tags: { type: String, default: null }, // 태그 ##
  publishedDate: { type: Date, default: Date.now() }, // 가입일
  updatedDate: { type: Date, default: Date.now() }, // 수정일
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // 작성자
  comments: [
    {
      commentWriter: {
        type: mongoose.Schema.Types.ObjectId,
        defult: null,
        ref: "user",
      },
      commentContent: { type: String, default: null },
      commentDate: { type: Date, default: Date.now() },
    },
  ],
});

// 글작성자와 로그인유저 비교
// this => model을 가르킴
postSchema.statics.checkAuth = async function (params) {
  const { postId, writerId } = params;
  console.log(postId, writerId);
  try {
    const ownResult = await this.findOne({ _id: postId }); // 게시물의 _id
    const ownId = ownResult.writer._id;
    if (ownId.toString() !== writerId.toString()) {
      return -1;
    }
    return 1;
  } catch (error) {
    console.error(error);
    return -2;
  }
};

module.exports = mongoose.model("post", postSchema);
