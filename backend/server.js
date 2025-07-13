// /backend/server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

const PORT = 3000;

// Middlewares

// CORS - allow all origin
const allowedOrigin = process.env.FRONTEND_ORIGIN;

app.use(cors({
	allowedOrigin,
}));

// Parse incoming json string into js objects
app.use(express.json());

// For render template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Routes

// Welcome at '/'
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 'GET' at '/users' to get all the users from database
app.get('/users', async (req, res) => {
	const listUsers = await prisma.users.findMany();

	res.json(listUsers);
});

// 'POST' at '/signup' to create a new user
app.post('/signup', async (req, res) => {
	const { name, email, password } = req.body;

	try{
		// Create user
		const newUser = await prisma.users.create({
			data: {
		    	name,
		    	email,
		    	password,
			},
		});

		// Send response back to the client
		res.status(201).json({message: "Account created successfully!"});
		console.log(`User '${name}' added to the database`);	// Log to server's console
	} catch{
		res.status(500).json({message: "Server side error. Could not create new user."});
		console.log("Server failed to save user data to database");	// Log to server's console
	}
});

// 'POST' at '/api/login' to login an existing user
app.post('/api/login', async (req, res) => {
	const { email, password } = req.body;

	try{
		const user = await prisma.users.findUnique({
			where: {
				email: email,
				password: password,
			},
		});

		// Handle login failure
		if (!user) {
			console.log(`Login failed: invalid credentials for ${email}`);	// Log failure to the server
			return res.status(401).json({ message: "Invalid email or password." });
		}

		// Send data from dashboard.ejs
		if(user){
			// Manually render partial HTML
      		const html = await ejs.renderFile(
        	path.join(__dirname, "views", "dashboard.ejs"),
        		{ name: user.name }
      		);

			res.send(html);		// Send plain html response to the client
			console.log(`'${user.name}' logged in successfully.`);	// Log to the server
		}
	} catch{
		res.status(500).json({message: "Some server side error during login"});
	}
});

app.listen(PORT, () => {
  console.log(`Express server listening on port http://localhost:${PORT}`);
})
