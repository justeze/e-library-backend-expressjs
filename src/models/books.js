//IMPORT FILE PATH
const db = require('../configs/dbMySql');

const bookModels = {
  getAllBooks: (query) => {
    let queryString = "";
    if (query.title === undefined || query.sortby === undefined || query.order === undefined) {
    
      const offset = (Number(query.page) - 1) * Number(query.limit);
      queryString = `SELECT p1.id, title, author, synopsis, release_year, genre, genre_id,image,added_at,books_qty FROM books AS p1 INNER JOIN genres AS p2 ON p1.genre_id= p2.id LIMIT ${query.limit} OFFSET ${offset}`
    } 
    
    else if (query.sortby === undefined || query.order === undefined) {
      const offset = (Number(query.page) - 1) * Number(query.limit);
      queryString = `SELECT p1.id, title, author, synopsis, release_year, genre, genre_id,image,added_at,books_qty FROM books AS p1 INNER JOIN genres AS p2 ON p1.genre_id= p2.id title LIKE '%${query.title}%' LIMIT ${query.limit} OFFSET ${offset}`
    } 
    
    else if (query.title === undefined || query.order === undefined) {
      const offset = (Number(query.page) - 1) * Number(query.limit);
      queryString = `SELECT p1.id, title, author, synopsis, release_year, genre, genre_id,image,added_at,books_qty FROM books AS p1 INNER JOIN genres AS p2 ON p1.genre_id= p2.id  ORDER BY ${query.sortby} LIMIT ${query.limit} OFFSET ${offset}`
    } 

    else if (query.title === undefined || query.sortby=== undefined) {
      const offset = (Number(query.page) - 1) * Number(query.limit);
      queryString = `SELECT p1.id, title, author, synopsis, release_year, genre, genre_id,image,added_at,books_qty FROM books AS p1 INNER JOIN genres AS p2 ON p1.genre_id= p2.id ${query.order} LIMIT ${query.limit} OFFSET ${offset}`
    } 

    else if (query.order === undefined) {
      const offset = (Number(query.page) - 1) * Number(query.limit);
      queryString = `SELECT p1.id, title, author, synopsis, release_year, genre, genre_id,image,added_at,books_qty FROM books AS p1 INNER JOIN genres AS p2 ON p1.genre_id= p2.id title LIKE '%${query.title}%' ORDER BY ${query.sortby} LIMIT ${query.limit} OFFSET ${offset}`
    } 
    
    else if (query.sortby === undefined) {
      const offset = (Number(query.page) - 1) * Number(query.limit);
      queryString = `SELECT p1.id, title, author, synopsis, release_year, genre, genre_id,image,added_at,books_qty FROM books AS p1 INNER JOIN genres AS p2 ON p1.genre_id= p2.id title LIKE '%${query.title}%' ${query.order} LIMIT ${query.limit} OFFSET ${offset}`
    } 
    
    else if (query.title === undefined) {
      const offset = (Number(query.page) - 1) * Number(query.limit);
      queryString = `SELECT p1.id, title, author, synopsis, release_year, genre, genre_id,image,added_at,books_qty FROM books AS p1 INNER JOIN genres AS p2 ON p1.genre_id= p2.id ORDER BY ${query.sortby} ${query.order} LIMIT ${query.limit} OFFSET ${offset}`
    }
    else {
      queryString = `SELECT p1.id, title, author, synopsis, release_year, genre, genre_id,image,added_at,books_qty FROM books AS p1 INNER JOIN genres AS p2 ON p1.genre_id= p2.id`
    }

    return new Promise((resolve, reject) => {
      db.query(queryString, (error, results) => {
        if (!error) {
          resolve(results)
        } else {
          reject(error)
        }
      });
    });
  },
  postNewBooks: (body) => {
    const queryString = "INSERT INTO books SET ?"
    return new Promise((resolve, reject) => {
      db.query(queryString, [body], (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  },
  patchBooks: (body) => {
    // console.log(id)
    return new Promise((resolve, reject) => {
      const queryString = `UPDATE books SET ? WHERE books.id =? `
      db.query(queryString, [body, body.id], (err, data) => {
        if (!err) {
          
          resolve(data)
        } else {
          // console.log(err)
          reject(err)
        }
      })
    })
  },
  deleteBooks: (query) => {
    return new Promise((resolve, reject) => {
      const queryString = 'DELETE FROM books WHERE id=?';
      db.query(queryString, [query.id], (error, data) => {
        if (!error) {
          resolve(data);
        } else {
          reject(error);
        }
      })
    });
  },
}

module.exports = bookModels;