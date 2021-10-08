const { Schema, Mongoose } = require("mongoose");
const Schema = Mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true, default: null }, // 제목
  content: { type: String, required: true, default: null }, // 내용
  category: { type: Number, default: "0" }, // 카테고리
  tags: { type: String, default: null }, // 태그 ##
  publishedDate: { type: Date, default: Date.now() }, // 가입일
  updatedDate: { type: Date, default: Date.now() }, // 수정일
  writer: { type: Mongoose.Schema.Types.ObjectId, ref: "user" }, // 작성자
  comments: [
    {
      commentWriter: {
        type: Mongoose.Schema.Types.comments,
        defult: null,
        ref: "user",
      },
      commentContent: { type: String, default: null },
      commentDate: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = Mongoose.model("post", postSchema);
