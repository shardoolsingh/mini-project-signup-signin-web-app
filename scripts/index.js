// index.js

    // Get <form> element
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
    // Prevent Default
    event.preventDefault();

    const user = {};

    // Password Validator function
    function validatePassword(password){
  	const hasValidLength = password.length >= 8;
  	const hasCapitalCase = /[A-Z]/.test(password);
  	const hasSmallCase = /[a-z]/.test(password);
  	const hasNumber = /\d/.test(password);
        const hasSymbol = /[^A-Za-z0-9\s]/g.test(password);
  
 	return hasValidLength && hasCapitalCase && hasSmallCase && hasNumber && hasSymbol;
    }

    // Capture input in user object
    user.name = document.querySelector("#name").value;
    user.email = document.querySelector("#email").value;
	    
    const rawPassword = document.querySelector("#password").value;
    if(validatePassword(rawPassword)){
	// Capture validated password for 'user' object
	user.password = rawPassword;
    } else {
	alert("Password must be at least 8 characters long and contain at least 1 capital case, 1 small case, 1 number & 1 symbol.");
	return;    // Return immediately
    }

    // Implement fetch() logic to send data to server
    fetch("https://mini-project-signup-signin-web-app.onrender.com/signup", {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(user)
    })
    .then(response => {
        // If response is not ok
	    if(!response.ok){
	        throw new Error(`HTTP Error: ${response.status}`);
	        return; 	// Early return
	    }

	    return response.json();	// Parse incoming 'json string'
    })
    .then(data => {
        if(data){	// JS truthy to confirm if there is some data
            console.log(data.message);    // Assume 'data' has a 'message' property

            // Add success message on UI
            const successPara = document.createElement("p");
            successPara.style.color = "green";
            successPara.innerText = data.message;   // Assuming 'data' has a 'message' property

            form.appendChild(successPara);
        }

        // Empty the input fields after submission
        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#password").value = "";

        // Refocus on name field
        document.querySelector("#name").focus();
    })
    .catch(error => {
	    console.error("Signup process failed. Error: ", error);
    });
    });

