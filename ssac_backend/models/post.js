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

module.exports = mongoose.model("post", postSchema);
