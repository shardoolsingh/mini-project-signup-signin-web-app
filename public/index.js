// index.js

// Get cta button
const signupBtn = document.querySelector("#btn-cta-signup");

signupBtn.addEventListener("click", (event) => {
    // Prevent Default
    event.preventDefault();

    const user = {};

    // Capture input in user object
    user.name = document.querySelector("#name").value;
    user.email = document.querySelector("#email").value;
    user.password = document.querySelector("#password").value;

    // Implement fetch() logic to send data to server
    fetch("/signup", {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(user)
    }).
    then(response => {
	// If response is not ok
	if(!response.ok){
	    throw new Error(`HTTP Error: ${rsponse.status}`);
	    return; 	// Early return
	}

	response.json();	// Parse incoming json string
    }).
    then(data => {
	if(data){	// JS truthy to confirm if there is some data
	    console.log("Success: ", data);
	}
    }).
    catch(error => {
	console.error("Signup process failed. Error: ", error);
    });

    // Verify data capture by logging user
    console.log(user);
});
