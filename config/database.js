// TODO - adicionar funcionalidade de limpar o BD de tempos em tempos
// para colocar a API online e não explodir o cabeçote!

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data.db");

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_password VARCAHR(255) NOT NULL,
    user_profile_photo_url TEXT DEFAULT (''), 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'Alura', '123456', "https://raw.githubusercontent.com/bugan/instalura-api/master/uploads/logo.jpg"
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'Alura')
`;

const INSERT_DEFAULT_USER_2 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'gabrielleitealura', '123456', 'http://USER-PHOTO-URL.com' 
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'gabrielleitealura')
`;

const INSERT_DEFAULT_USER_3 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'pauloscalercioalura', '123456', 'http://USER-PHOTO-URL.com' 
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'pauloscalercioalura')
`;

const PHOTO_SCHEMA = `
CREATE TABLE IF NOT EXISTS photo (
    photo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo_post_date TIMESTAMP DEFAULT current_timestamp, 
    photo_url TEXT DEFAULT (''), 
    photo_description TEXT DEFAULT ('') NOT NULL, 
    photo_allow_comments INTEGER NOT NULL DEFAULT (1), 
    photo_likes BIGINT NOT NULL DEFAULT (0),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;

// CREATE TABLE `foto` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `bytes` longblob,
//     `comentario` varchar(255) NOT NULL,
//     `instante` tinyblob,
//     `removed_instant` tinyblob,
//     `url` varchar(255) DEFAULT NULL,
//     `usuario_id` int(11) NOT NULL,
//     PRIMARY KEY (`id`),
//     KEY `FKkeyss3i39o47lj7jctjqpwai2` (`usuario_id`),
//     CONSTRAINT `FKkeyss3i39o47lj7jctjqpwai2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
const INSERT_DEFAULT_PHOTO_1 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 1,datetime('2018-02-01 15:10:50'),'https://www.imagemhost.com.br/images/2019/11/27/foto_3.jpg', 'comentario da foto',1 
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 1)
`;
const INSERT_DEFAULT_PHOTO_2 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)




SELECT 2,datetime('2018-02-13 10:30:25'),'https://www.imagemhost.com.br/images/2019/11/27/65471462_1193154477523428_3282751902607052484_n.jpg','comentario da foto',1
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 2)
`;
const INSERT_DEFAULT_PHOTO_3 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 3,datetime('2018-02-23 19:00:15'),'https://www.imagemhost.com.br/images/2019/11/27/47117459_2143415245698396_1579765390659818341_n.jpg','comentario da foto',1
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 3)
`;
const INSERT_DEFAULT_PHOTO_4 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 4,datetime('2018-03-17 12:15:00'),'https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2','comentario da foto',2
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 4)
`;
const INSERT_DEFAULT_PHOTO_5 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 5,datetime('2018-04-10 13:35:20'),'https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2','comentario da foto',3
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 5)
`;
const INSERT_DEFAULT_PHOTO_6 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 6,datetime('2018-05-19 16:45:00'),'https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2','comentario da foto',3
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 6)
`;

const COMMENT_SCHEMA = `
CREATE TABLE IF NOT EXISTS comment (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment_date TIMESTAMP DEFAULT current_timestamp,
    comment_text TEXT  DEFAULT (''),
    photo_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
);
`;

const INSERT_COMENTS_1 = `
INSERT INTO comment (
    comment_text,
    user_id,
    photo_id
)
SELECT "Muito bom!!",2, 1
WHERE NOT EXISTS (SELECT * FROM comment WHERE user_id = 2)
`;

const INSERT_COMENTS_2 = `
INSERT INTO comment (
    comment_text,
    user_id,
    photo_id
)
SELECT "Parabéns aos envolvidos!!",3, 1
WHERE NOT EXISTS (SELECT * FROM comment WHERE user_id = 3)
`;
const LIKE_SCHEMA = `
CREATE TABLE IF NOT EXISTS like (
    like_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    photo_id INTEGER,
    user_id  INTEGER,
    like_date TIMESTAMP DEFAULT current_timestamp, 
    UNIQUE(user_id, photo_id),
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
)
`;

const INSERT_LIKE = `
INSERT INTO like (
    photo_id,
    user_id
)
SELECT 1,1
WHERE NOT EXISTS (SELECT * FROM like WHERE photo_id= 1 and user_id = 1)
`;

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(USER_SCHEMA);
  db.run(INSERT_DEFAULT_USER_1);
  db.run(INSERT_DEFAULT_USER_2);
  db.run(INSERT_DEFAULT_USER_3);
  db.run(PHOTO_SCHEMA);
  db.run(INSERT_DEFAULT_PHOTO_1);
  db.run(INSERT_DEFAULT_PHOTO_2);
  db.run(INSERT_DEFAULT_PHOTO_3);
  /*db.run(INSERT_DEFAULT_PHOTO_4);
  db.run(INSERT_DEFAULT_PHOTO_5);
  db.run(INSERT_DEFAULT_PHOTO_6); */
  db.run(COMMENT_SCHEMA);
  db.run(INSERT_COMENTS_1);
  db.run(INSERT_COMENTS_2);
  db.run(LIKE_SCHEMA, err =>
    err ? console.log(err) : console.log("Tabela like criada!")
  );
  db.run(INSERT_LIKE);

  //   db.each("SELECT * FROM user", (err, user) => {
  //     console.log("Users");
  //     console.log(user);
  //   });

  // db.each("SELECT * FROM photo", (err, photo) => {
  //     console.log('Photos');
  //     console.log(photo);
  // });
});

process.on("SIGINT", () =>
  db.close(() => {
    console.log("Database closed");
    process.exit(0);
  })
);

module.exports = db;
