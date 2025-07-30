//import the express module
const express =require('express')
//import mysql2
const mysql = require('mysql2');
const app=express()
//define the connection parametrs for the database
//dbconfig 
const dbConfig = {
    connectionLimit: 10, // optional, set the connection limit
    host: 'localhost',
    user:   'demoapp',     
    password: 'Demoapp@tad123', // replace with your MySQL password
    database: 'demoapp' 
}// replace with your database name
//create a connection pool
const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});
//set up port
const port=4000;


app.use(express.json()); // Middleware to parse JSON bodies
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
    next();
});
app.get("/",(req,res)=>{
    res.send("he listening")
})

//add-employee route by post method
app.post("/add-employee",(req,res)=>{
    console.log("Received data:", req.body);
    //write sql query to insert data into the database tabel employee-test    columns   first_name: 'Tadesse',
//   last_name: 'Shefera',
//   email: 'tadesse@gmail.com',
//   password: '123456'
    const { first_name, last_name, email, password } = req.body;
    const sql = 'INSERT INTO `employee_test` (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [first_name, last_name, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({error:'Error inserting data'});
            return;
        }
        console.log('Data inserted successfully:', result);
        res.status(201).json({message:'Employee added successfully'});
    });

});
//post request handler to login an employee with rout /login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM `employee_test` WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({message:'Error during login'});
            return;
        }//ssh-ed25519 
        if (results.length > 0) {
            console.log('Login successful:', results[0]);
            res.status(200).json({message:'Login successful'});
        } else {
            console.log('Invalid email or password');
            res.status(401).json({message:'Invalid email or password'});
        }
    });
});




//listen server
app.listen(port,()=>console.log(`Listening on port ${port}`));
