const photoConverter = row => ({
  id: row.photo_id,
  postDate: new Date(row.photo_post_date),
  url: row.photo_url,
  description: row.photo_description,
  allowComments: row.photo_allow_comments == "true" ? true : false,
  likes: row.likes,
  comments: row.comments,
  userId: row.user_id,
  userName: row.user_name,
  userURL: row.user_profile_photo_url,
  comentarios: []
});

const maxRows = 10;

class FeedDao {
  constructor(db) {
    this._db = db;
  }

  list(page) {
    const from = (page - 1) * maxRows;

    let limitQuery = "";

    if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

    return new Promise((resolve, reject) => {
      this._db.all(
        `
        SELECT  p.*,
        (SELECT COUNT(c.comment_id) 
            FROM comment as c 
            WHERE c.photo_id = p.photo_id
         ) as comments, 

        (SELECT COUNT(l.like_id) 
            FROM like as l 
            WHERE l.photo_id = p.photo_id
        ) as likes,

        (SELECT u.user_name 
        FROM user as u 
        WHERE u.user_id = p.user_id
        ) as user_name,  
        
        (SELECT u.user_profile_photo_url 
            FROM user as u 
            WHERE u.user_id = p.user_id
        ) as user_profile_photo_url

        FROM photo AS p
        ORDER BY p.photo_post_date DESC
                ${limitQuery} ;
                `,
        (err, rows) => {
          if (err) {
            console.log(err);
            return reject("Can`t list photos");
          }

          const photos = rows.map(photoConverter);
          console.log("photos retornadas: ");
          resolve(photos);
        }
      );
    });
  }
}

module.exports = FeedDao;
