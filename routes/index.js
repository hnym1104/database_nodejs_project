var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 5,
  host: 'localhost',
  user: 'root',
  password: 'gdf1104',
  database: 'tutorial'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    //Use the connection
    connection.query('SELECT * FROM board', function(err, rows) {
      if(err) console.log("err : " + err);
      console.log("rows : " + JSON.stringify(rows));
      
      res.render('index', {title: 'test', rows: rows});
      connection.release();

      // Don't use the conection here, it has been returned in the pool.
    })
  })
});

module.exports = router;
