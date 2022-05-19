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

  static async findById(req, res) {
    try { 
      const user = req.user; 
      const contactId = req.params.id;   
      const contact = await Contacts.findOne({
        where: {
          id: contactId,
          userId: user.id, 
        }, 
      }); 
      res.json( contact ); 
    } 
    catch (error) {
      console.error({currentContact: error}); 
      res.status(400).send({error: error.essage }); 
    }
  }

  static async edit(req, res) {
    try {
      const contactId = req.params.id; 
      await Contacts.update(
        {
          name: req.body.contactName,
          email: req.body.email,
          phoneNo: req.body.phoneNo,
          company: req.body.company,
          userId: req.user.id,
          jobId: req.body.jobId, 
        }, 
        {
          where: {
            id: contactId
          }
        }
      )
      res.status(200).send('OK'); 
    } catch (error) {
      res.status(500).send(error); 
    }
  }

  static async destroy(req, res) {
    try {
      const user = req.user; 
      const contactId = req.params.id; 
      await Contacts.destroy(
        {
          where: {
            id: contactId,
            userId: user.id, 
          }
        }
      )
      console.log("contact deleted"); 
      res.status(200).send("Contact deleted"); 
    } catch (error) {
      res.status(500).send(error); 
    }
  }
}

module.exports = { ContactController };
