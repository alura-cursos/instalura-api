/**
 *  Rotas de API:
 *
 *  POST /usuarios (users/signup) - Cria novo usuário.
 *      HEADERS
 *          Content-type: application/json
 *          x-access-token
 *      BODY
 *          login,
 *          senha,
 *          urlFotoPerfil
 *
 *  POST /fotos/${fotoId}/comentarios - Cria novo comentário.
 *      HEADERS
 *          Content-type: application/json
 *          x-access-token
 *      BODY
 *          comentario: Texto do comentário.
 */

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  path = require("path"),
  cors = require("cors"),
  db = require("./database"),
  multer = require("multer"),
  uuidv4 = require("uuid/v4"),
  fs = require("fs"),
  {
    commentRoutes,
    photoRoutes,
    userRoutes,
    feedRoutes
  } = require("../app/routes");

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  fs.mkdirSync(uploadDir + "/imgs");
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/imgs");
  },
  filename: function(req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    console.log("Receiving image file");
    cb(null, true);
  }
});

app.set("secret", "your secret phrase here");
app.set("upload", upload);

const corsOptions = {
  exposedHeaders: ["x-access-token"]
};

app.use("/static", express.static("uploads"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("####################################");
  if (token) {
    console.log("A token is send by the application");
    console.log("Token value is " + token);
  } else {
    console.log("No token is send by the the application");
  }
  console.log("####################################");
  next();
});

userRoutes(app);
photoRoutes(app);
commentRoutes(app);
feedRoutes(app);

app.use("*", (req, res) => {
  res.status(404).json({ message: `Rota ${req.originalUrl} não existe!` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor!" });
});

module.exports = app;
