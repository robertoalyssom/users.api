import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a new contact for the authenticated user
 */
export async function createContact(req, res) {
  try {
    const { name, age, email } = req.body;
    const userId = req.user.id;

    const newContact = await prisma.contact.create({
      data: {
        name,
        age,
        email,
        ownerAccountId: userId,
      },
    });
    return res.status(201).json(newContact);
  } catch (err) {
    console.error("Create contact error:", err);
    return res.status(500).json({ error: "Error creating contact" });
  }
}

/**
 * Get all contacts for the authenticated user
 */
export async function getContacts(req, res) {
  try {
    const userId = req.user.id;
    const contacts = await prisma.contact.findMany({
      where: { ownerAccountId: userId },
    });
    return res.status(200).json(contacts);
  } catch (err) {
    console.error("Get contacts error:", err);
    return res.status(500).json({ error: "Error fetching contacts" });
  }
}

/**
 * Update a contact for the authenticated user
 */
export async function updateContact(req, res) {
  try {
    const contactId = req.params.id;
    const userId = req.user.id;
    const { email, age, name } = req.body;

    const updatedContact = await prisma.contact.update({
      where: {
        id: contactId,
        ownerAccountId: userId,
      },
      data: { email, age, name },
    });
    return res.status(200).json(updatedContact);
  } catch (err) {
    console.error("Update contact error:", err);
    return res.status(500).json({ error: "Error updating contact" });
  }
}

/**
 * Delete a contact for the authenticated user
 */
export async function deleteContact(req, res) {
  try {
    const contactId = req.params.id;
    const userId = req.user.id;

    await prisma.contact.delete({
      where: {
        id: contactId,
        ownerAccountId: userId,
      },
    });
    return res.status(200).json({ message: "Contact deleted successfully." });
  } catch (err) {
    console.error("Delete contact error:", err);
    return res.status(500).json({ error: "Error deleting contact" });
  }
}
