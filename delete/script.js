// Write your code below:

// API endpoint for CRUD operations
const apiUrl = "https://crudcrud.com/api/5c27ca008b464fcba63521758ba921f9/appointmentData";
let editingUserId = null;  // Variable to track if a user is being edited

// Function to handle form submission (Create or Update user)
function handleFormSubmit(event) {
  event.preventDefault();

  // Create user object from form inputs
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  // If editing an existing user (editingUserId is set), update the user
  if (editingUserId) {
    // We already deleted the old user, so just post the new details
    postUser(userDetails);
  } else {
    // Otherwise, just post a new user
    postUser(userDetails);
  }

  // Clear the input fields after submission
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  editingUserId = null;  // Reset editing user ID
}

// Function to make a POST request to CrudCrud to save user details
function postUser(userDetails) {
  axios
    .post(apiUrl, userDetails)
    .then((response) => {
      displayUserOnScreen(response.data); // Display the updated/new user on the screen
    })
    .catch((error) => console.log(error));
}

// Function to display a user on the screen
function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.setAttribute("data-id", userDetails._id); // Add unique ID to the DOM element
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  // Create edit button
  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  // Append the new user item to the list
  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  // Handle deletion of user
  deleteBtn.addEventListener("click", function () {
    deleteUser(userDetails._id, userItem); // Pass the user ID and DOM element for deletion
  });

  // Handle editing of user
  editBtn.addEventListener("click", function () {
    editUser(userDetails._id, userDetails, userItem);
  });
}

// Function to delete user from CrudCrud and the DOM
function deleteUser(userId, userItem) {
  axios
    .delete(`${apiUrl}/${userId}`)
    .then(() => {
      userItem.remove(); // Remove from the DOM after successful deletion
    })
    .catch((error) => console.log("Error deleting user: ", error));
}

// Function to edit user
function editUser(userId, userDetails, userItem) {
  // Populate form fields with existing details
  document.getElementById("username").value = userDetails.username;
  document.getElementById("email").value = userDetails.email;
  document.getElementById("phone").value = userDetails.phone;

  // Remove the current user item from the DOM
  userItem.remove();

  // Set the editingUserId to track that we are in "edit mode"
  editingUserId = userId;

  // Now we need to delete the old user from CrudCrud
  deleteUser(userId, userItem);
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
module.exports = handleFormSubmit;