document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    console.log("Logging in...");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
        // Send login request to API server
        const response = await fetch("http://localhost:5000/api/v1/login", {
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
        const response = await fetch("http://localhost:5000/api/v1/contacts", {
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
        contactList.appendChild(li);
    });

    // Show contacts section
    document.getElementById("contactsSection").style.display = "block";
}
