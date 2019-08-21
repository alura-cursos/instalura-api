const { FeedDao, PhotoDao } = require("../infra");
const api = {};

api.list = async (req, res) => {
  console.log("####################################");
  const { page } = req.query;
  const posts = await new FeedDao(req.db).list(page);
  const postComentado = posts.map(async foto => {
    const comentarios = await new PhotoDao(req.db).getCommentsFromPhoto(
      foto.id
    );
    foto.comentarios = comentarios;
    return foto;
  });

  Promise.all(postComentado).then(completo => {
    res.json(completo);
  });
};

module.exports = api;
