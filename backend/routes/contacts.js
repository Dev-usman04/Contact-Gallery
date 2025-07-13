const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');


router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('phone', 'Phone number is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone } = req.body;

    try {
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  }
);


router.put('/:id', auth, async (req, res) => {
  const { name, email, phone } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;