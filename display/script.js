// Write your code below:
// API endpoint for CRUD operations
const apiUrl = "https://crudcrud.com/api/5c27ca008b464fcba63521758ba921f9/appointmentData";

// Function to handle form submission
function handleFormSubmit(event) {
  // Prevent page from refreshing
  event.preventDefault();

  // Create user object from form inputs
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  // Send POST request to CrudCrud to save user details
  axios
    .post(apiUrl, userDetails)
    .then((response) => {
      displayUserOnScreen(response.data); // Display the user on the screen
    })
    .catch((error) => console.log(error));

  // Clear the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

// Function to display a user on the screen
function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  // Handle deletion of user
  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    // Optionally: Add logic to delete from server
  });

  // Handle editing of user
  editBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
    // Optionally: Add logic to update on server
  });
}

// Function to fetch all users and display them on page load
function fetchAndDisplayUsers() {
  axios
    .get(apiUrl)
    .then((response) => {
      response.data.forEach((user) => {
        displayUserOnScreen(user); // Display each user fetched from the server
      });
    })
    .catch((error) => console.log(error));
}

// Call the fetch function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchAndDisplayUsers);

// Do not touch the code below
