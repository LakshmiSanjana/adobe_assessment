// routes.js - Define all routes using Express Router
const express = require('express');
const router = express.Router();
const ContactServiceFactory = require('./contactController'); // Correct import of the factory

// Create an instance of ContactService using the factory
const contactService = ContactServiceFactory.create();

// Define routes with versioning
router.get('/api/v1/contacts', (req, res) => contactService.getContacts(req, res));
router.post('/api/v1/contacts', (req, res) => contactService.createContact(req, res));
router.put('/api/v1/contacts', (req, res) => contactService.updateContact(req, res));
router.delete('/api/v1/contacts/:id', (req, res) => contactService.deleteContact(req, res));

module.exports = router;
