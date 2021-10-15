const client = require("../../../modules/elasticModule");
const code = require("../../../modules/statusCode");

const searchController = {
  search: async (req, res) => {
    const { q } = req.query;
    try {
      const result = await client.search({
        index: "post_index",
        body: {
          size: 3,
          query: {
            match: {
              "title.ngram": q,
            },
          },
          highlight: {
            fields: {
              "title.ngram": {},
            },
          },
        },
      });

      console.log(result.hits.hits);
      const searchResult = result.hits.hits;

      const finResult = searchResult.map((item) => {
        const data = item.highlight["title.ngram"];
        return { title: data, score: item._score };
      });

      res.status(code.OK).json({
        message: "검색 성공",
        data: finResult,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "ELS 서버 에러",
      });
    }
  },
};

module.exports = searchController;
