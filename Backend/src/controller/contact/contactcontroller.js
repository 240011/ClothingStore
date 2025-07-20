import { Contact } from '../../models/index.js';

/**
 * Create new contact submission
 */
const create = async (req, res) => {
  try {
    const { name, email,  message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).send({ data: contact, message: "Contact form submitted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};

/**
 * Get all contact submissions
 */
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).send({ data: contacts });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
};

export const contactController = {
  create,
  getAll,
};
