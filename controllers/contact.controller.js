const { Contacts } = require("../models");

class ContactController {
  static async create(req, res) {
    try {
      const ContactData = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        company: req.body.company,
        userId: req.user.id,
      };
      await Contacts.create(ContactData);

      res.status(200).send("OK");
    } catch (error) {
      console.log("error", error);
      res.status(400).send({ error });
    }
  }

  static async findAll(req, res) {
    try {
      const user = req.user;

      const contacts = await Contacts.findAll({
        where: {
          userId: user.id,
        },
      });

      res.send(contacts);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = { ContactController };
