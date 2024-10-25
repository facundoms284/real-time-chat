const express = require('express');
const router = express.Router();

const MessagesController = require('../controllers/messages');
const newMessagesController = new MessagesController();

router.post('/', newMessagesController.add);
router.get('/', newMessagesController.getAll);

module.exports = router;
