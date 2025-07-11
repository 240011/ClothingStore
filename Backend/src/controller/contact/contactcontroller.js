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

export const contactController = {
  create,
};