const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const pg = require('pg');
const {Pool} = require("pg");
//const path = require('path');
//var pool=new pg.Pool();

/*app.use(bodyParser.urlencoded({
    extended: true
  }));*/

//app.use(bodyParser());
//app.use(express.bodyParser());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:pradiksha123@localhost:5432/student';
const pool = new Pool({
    connectionString: connectionString,
  })


app.post('/student',(req,res)=>{
    var body=req.body;
    pool.connect(function(err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        } 
        if(body){
            const data = {
                name:body.name,
                mother_name:body.motherName ,
                father_name:body.fatherName,
                email:body.email,
                phone:body.phone,
                bloodgroup:body.bgroup,
                address:body.address,
                tenth:body.tenth,
                tewelth:body.tewelth,
                ug:body.ug,
                pg:body.pg,
                skill:body.skill
            };
            client.query('INSERT INTO userdetails(name, mother_name, father_name, email, phone, bloodgroup, address,tenth,tewelth,ug,pg,skill) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            [data.name, data.mother_name,data.father_name,data.email,data.phone,data.bloodgroup,data.address,data.tenth,data.tewelth,data.ug,data.pg,data.skill], function(err, result) {
                done();
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                res.status(200).send(result);
            });
        } 
    });
});


app.get('/student/:id', function(req, res, next) {
    pool.connect(function(err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query("SELECT * FROM userdetails where id= $1", [req.params.id], function(err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    });
});

app.get('/student',function(req,res, next){
    pool.connect(function(err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }

        client.query("SELECT * FROM userdetails where email= $1 AND name = $2",[req.query.email,req.query.password],function(err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    });
});



app.listen(4000,()=>{
    console.log("listening on port 4000...");
})


