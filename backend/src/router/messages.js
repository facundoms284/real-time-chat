const express = require('express');
const router = express.Router();

const MessagesController = require('../controllers/messages');
const newMessagesController = new MessagesController();

router.post('/', newMessagesController.add);
router.delete('/:id', newMessagesController.delete);

module.exports = router;
