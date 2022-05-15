const { Contacts } = require("../models"); 

class ContactController {
  static async create(req, res) {
    try {
      const ContactData = {
        name: req.body.contactName,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        company: req.body.company,
        userId: req.user.id,
        jobId: req.body.jobId, 
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

  static async currentContact(req, res) {
    try {
      const userKey = parseInt(req.params.ID); 
      const contact = await Contacts.findByPk(userKey); 
      res.json({ contact }); 
    } 
    catch (error) {
      console.error({currentContact: error}); 
      res.status(400).send({error: error.essage }); 
    }
  }
}

module.exports = { ContactController };
