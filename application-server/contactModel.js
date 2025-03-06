// contactModel.js - Repository Pattern for Data Access
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./contacts.db');

class ContactRepository {
    constructor() {
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT)");
        });
    }

    getAllContacts(callback) {
        db.all("SELECT * FROM contacts", callback);
    }

    createContact(contact, callback) {
        const { name, email, phone } = contact;
        db.run("INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)", [name, email, phone], function(err) {
            callback(err, this.lastID);
        });
    }

    updateContact(contact, callback) {
        const { id, name, email, phone } = contact;
        db.run("UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?", [name, email, phone, id], callback);
    }

    deleteContact(id, callback) {
        db.run("DELETE FROM contacts WHERE id = ?", [id], callback);
    }
}

module.exports = ContactRepository;
