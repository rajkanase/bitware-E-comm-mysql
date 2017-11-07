const express=require('express');
const router=express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_mysql"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get('/',(req,res)=>{
    res.send('Api Works !');
})

router.get('/getallusers',(req,res)=>{
    // if (err) throw err;
    con.query("SELECT * FROM user_table", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    });

})

router.post('/saveuser',(req,res)=>{
    let data = {
        role:req.body.role,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        user_name:req.body.user_name,
        email:req.body.email,
        password:req.body.password,
        password_confirmation:req.body.password_confirmation
    };
    let sql="insert into user_table set ?";
    let query=con.query(sql,data,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Data saved..');
    });
});


router.get('/getoneuser/:email/:password',(req,res)=>{
    let em=req.params.email;
    let pass=req.params.password;

    let sql=`SELECT * FROM user_table WHERE email='${em}' AND password='${pass}'`;
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })

})

router.delete('/delete/:email',(req,res)=>{
    let em=req.params.email;

    let sql=`delete from user_table where email='${em}'`;
    con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Deleted');
    })
})

module.exports=router;