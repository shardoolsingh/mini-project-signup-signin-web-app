// /backend/server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

const PORT = 3000;

// Middlewares

// CORS - allow all origin
app.use(cors());

// Parse incoming json string into js objects
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Express server listening on port http://localhost:${PORT}`);
})
