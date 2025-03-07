// Get the host from the environment or default to 'localhost' when testing locally
// Update this to your API's IP/Port if needed:
const apiBaseURL = '18.119.235.205:5000';

console.log("API Base URL " + apiBaseURL);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Logging in...");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
        // Send login request to API server
        const response = await fetch(`http://${apiBaseURL}/api/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        const token = data.token;

        // Store the JWT token in localStorage
        localStorage.setItem("token", token);

        // Show contacts section after successful login
        fetchContacts();

    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Function to fetch contacts from the API server
async function fetchContacts() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        return;
    }

    try {
        const response = await fetch(`http://${apiBaseURL}/api/v1/contacts`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch contacts");
        }

        const data = await response.json();
        displayContacts(data.contacts);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Function to display contacts
function displayContacts(contacts) {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";  // Clear previous data

    contacts.forEach(contact => {
        const li = document.createElement("li");
        li.textContent = `${contact.name} - ${contact.email} - ${contact.phone}`;

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteContact(contact.id);

        li.appendChild(deleteBtn);
        contactList.appendChild(li);
    });

    // Show contacts section
    document.getElementById("contactsSection").style.display = "block";
}

// Show Add Contact Form
document.getElementById("addContactBtn").addEventListener("click", () => {
    document.getElementById("addContactForm").style.display = "block";
});

// Add new contact to the API server
document.getElementById("submitContact").addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const phone = document.getElementById("contactPhone").value;

    if (!name || !email || !phone) {
        alert("Please fill all the fields");
        return;
    }

    try {
        const response = await fetch(`http://${apiBaseURL}/api/v1/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ name, email, phone })
        });

        if (!response.ok) {
            throw new Error("Failed to add contact");
        }

        // After successful addition, fetch the updated contact list again
        fetchContacts();

        // Hide the Add Contact Form
        document.getElementById("addContactForm").style.display = "none";

        // Optionally clear the input fields
        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("contactPhone").value = "";

    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Delete contact from the API server
async function deleteContact(contactId) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`http://${apiBaseURL}/api/v1/contacts/${contactId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete contact");
        }

        // After successful deletion, fetch the updated contacts again
        fetchContacts();
    } catch (error) {
        alert("Error: " + error.message);
    }
}
