# Contact List Frontend

A simple **HTML, CSS, and JavaScript** application that allows users to:

- **Log in** to an API server (using a username and password)  
- **View** all contacts  
- **Add** a new contact  
- **Delete** an existing contact  

This frontend communicates with an API hosted at `http://18.119.235.205:5000/api/v1/...`. It uses **JWT authentication** by sending a token in the `Authorization` header.

---

## 📌 Table of Contents

- [📌 Table of Contents](#-table-of-contents)
- [🚀 Features](#-features)
- [📋 Prerequisites](#-prerequisites)
- [📁 Project Structure](#-project-structure)
- [📜 Files & Full Code](#-files--full-code)
  - [1. index.html](#1-indexhtml)
  - [2. style.css](#2-stylecss)
  - [3. app.js](#3-appjs)
- [💻 Setup & Usage](#-setup--usage)
  - [1️⃣ Clone or Download](#1️⃣-clone-or-download)
  - [2️⃣ Local Setup](#2️⃣-local-setup)
  - [3️⃣ Open the App in Your Browser](#3️⃣-open-the-app-in-your-browser)
- [🔐 Authentication Flow](#-authentication-flow)
- [➕ Adding a New Contact](#-adding-a-new-contact)
- [🗑️ Deleting a Contact](#-deleting-a-contact)
- [⚙️ Customization](#️-customization)
- [🐞 Troubleshooting](#-troubleshooting)
- [📄 License](#-license)

---

## 🚀 Features

✅ **Login Authentication** using JWT tokens  
✅ **Fetch & Display Contacts** from an API  
✅ **Add Contacts** dynamically  
✅ **Delete Contacts** with a single click  
✅ **Simple & Clean UI** with **CSS Styling**  

---

## 📋 Prerequisites

- A web browser (Chrome, Firefox, Edge, Safari, etc.).
- An API server running at `http://18.119.235.205:5000` (or your own server) that supports:
  - `POST /api/v1/login` → for user authentication (returns JWT).
  - `GET /api/v1/contacts` → for listing contacts.
  - `POST /api/v1/contacts` → for creating a new contact.
  - `DELETE /api/v1/contacts/:id` → for deleting a contact.

---
