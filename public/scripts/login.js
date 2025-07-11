// /public/login.js

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
	// Prevent Default form action
	event.preventDefault();

	const requestUser = {};

	// Catch input
	const emailInput = document.querySelector("#email");
	const passwordInput = document.querySelector("#password");

	requestUser.email = emailInput.value;
	requestUser.password = passwordInput.value;

	// Send data using fetch() & 'POST'
	const fetchPromise = fetch("http://localhost:3000/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestUser)
	});

	// handle fetchPromise Implementation
	fetchPromise.then(response => {
		// If resonse is not ok
		if(!response.ok){
			throw new Error(`HTTP Error: ${response.status}.`);
		}

		//return response.json();	// Parse incoming json string into usable js object
		return response.text();	// Get HTML response
	}).then(html => {
		if(html){	// JS truthy to verify there is some data
			//console.log(data.message);	// Assuming data has a 'message' property
			document.querySelector(".section-login").innerHTML = html;

		}
	}).catch(error => {
		console.log("Failed to fetch data & hence could not log in. Errror: ", error);
	});
});
