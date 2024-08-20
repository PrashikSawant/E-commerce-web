var express = require('express')
var session = require('express-session')
var mysql = require('mysql')
const fileUpload = require('express-fileupload');

const uniqueString = require('unique-string');

var app = express()

app.use(session({secret: 'my secret key'}));

app.use(fileUpload());

app.locals.baseUrl = "http://localhost:3000"

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require("bcryptjs");

var pwHash = (pwd) => {
  return bcrypt.hashSync(pwd, 10);
}

var pwVerify = (pwd,hash) => {
  if(bcrypt.compareSync(pwd, hash)) {
    return true;
  } else {
    return false;
  } 
}



//static folder
app.use(express.static('static'))


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'prashik123ys',
  database : 'inventorydb'
})

connection.connect(function(err) {
  if (err) {
    console.log("Cannot connect to mysql...")
    throw err
  }
  console.log('Connected to mysql...')
})

//set view engine to ejs
app.set('view engine', 'ejs');

// homepage
app.get('/', function (req, res) {
  res.locals.user = req.session.user;

  connection.query('SELECT * from products', function (error, results, fields) {
    if (error) throw error;
    res.render('index', {
      title : "Shop",
      products: results
    })
  });

})

//login
app.get('/login', function (req, res) {
  res.render('login', {title : "Login"})
})
app.post('/login', function (req, res) {
  console.log(req.body)
  let usr = req.body
  // res.render('login', {title: "Failed! Try again", failed: true});

  connection.query(`SELECT * from customers where username="${usr.uname}"`, function(err, rows, fields) {
    if (!err) {
      console.log('The solution is: ', rows[0]);

      if(typeof rows[0] != 'undefined' && 
	 pwVerify (usr.pwd, rows[0].password)){
        console.log("Successful Login");
        req.session.user = {
          id : rows[0].id,
          username : rows[0].username,
        };
        res.redirect('/');
      } else {
        res.render('login', {title: "Failed! Try again", failed: true});
      }
    }
    else
      throw err;
  });
  
})

//register
app.get('/register', function (req, res) {
  res.render('register', {title : "Register"})
})
//register post
app.post('/register', function (req, res) {
  console.log(req.body)
  let usr = req.body
  let pwwd = pwHash(usr.pwd)
  connection.query(`SELECT * from customers where username="${usr.uname}"`, function(err, rows, fields) {
	  console.log(rows.length);
    if(rows.length <= 0){
      //no user with specified username
      connection.query(`INSERT into customers(username, password) values("${usr.uname}","${pwwd}")`, function(err, rows, fields) {
        if(!err) {
          res.redirect('/login');
        } else {
          res.render('register', {title : "Some error occurred", failed: true})
        }
      })

    } else {
      res.render('register', {title : "Username already in use", failed: true})
    }
  });

})


/*new code added for placing order/confirming delivery etc*/
//404 not found path
app.get('/404',(req,res)=> {
  res.render('404')
})
// Item page
app.get('/item/:id', function (req, res) {
  res.locals.user = req.session.user

  connection.query(`SELECT * from products where id=${req.params.id}`, function (error, results, fields) {
    if (error) throw error;
    // res.send(results)

    if(results.length > 0) {
      res.render('items', {
        product: results[0]
      })
    } else {
      res.redirect('/404')
    }
    
  });

})
//buy
app.post('/buy', function(req, res) {
  // res.send({...req.body, user:{...req.session.user}})
  let account = req.session.user
  let order = req.body
  connection.query(`insert into orders(pid,uid,qty) values("${order.product}","${account.id}",${order.qty})`, function(err, rows, fields) {
    if (!err) {
      connection.query(`UPDATE products set stock = stock - ${order.qty} where id=${order.product}`, function (error, results, fieldss) {
        if(!error)
        console.log('Successfully purchased');
        res.redirect('/orders')
      });
    }else {
      console.log('error in purchase');
    }
  });

})
// customer orders page
app.get('/orders', function(req, res){
  if(req.session.user) {
    res.locals.user = req.session.user
    connection.query(`select orders.id as oid,pid,uid,qty,status,date,name,picture from orders,products where uid = ${req.session.user.id} and orders.pid=products.id`, function(err, results, fields) {
      if(!err) {
        console.log(results)
        res.render("orders", {
          orders: results
        })
      }
    })
  } else {
    res.redirect('/404')
  }
})
//confirm orders
app.get('/orders/:id/confirm', function(req, res){
  if(req.session.user) {
    res.locals.user = req.session.user
    connection.query(`update orders set status="delivered" where id = ${req.params.id}`, function(err, results, fields) {
      if(!err) {
        console.log(results)
        res.redirect('/orders')
      }
    })
  } else {
    res.redirect('/404')
  }
})


//log out
app.get('/logout',(req,res)=> {
  req.session.destroy();
  res.redirect('/');
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started at port "+port)
    console.log("http://localhost:"+port)
})
