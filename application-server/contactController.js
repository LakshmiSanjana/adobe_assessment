// contactController.js - Service Layer & Factory Pattern
const ContactRepository = require('./contactModel');

class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }

    getContacts(req, res) {
        // console.log("GET /contacts");
        this.contactRepository.getAllContacts((err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ contacts: rows });
        });
    }

    createContact(req, res) {
        const { name, email, phone } = req.body;
        const newContact = { name, email, phone };
        
        this.contactRepository.createContact(newContact, (err, id) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id });
        });
    }

    updateContact(req, res) {
        const { id, name, email, phone } = req.body;
        const updatedContact = { id, name, email, phone };
        
        this.contactRepository.updateContact(updatedContact, (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: "Contact updated" });
        });
    }

    deleteContact(req, res) {
        const { id } = req.params;
        this.contactRepository.deleteContact(id, (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: "Contact deleted" });
        });
    }
}

class ContactServiceFactory {
    static create() {
        const contactRepository = new ContactRepository();
        return new ContactService(contactRepository);
    }
}

module.exports = ContactServiceFactory;
