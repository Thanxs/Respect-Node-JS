const express = require("express");
const router = express.Router();
const ctrl = require("./messages.controller");
const { params_get_by_id } = require("./messages.validations");

router.get("/chat/messages", ctrl.get_messages_handler);
router.get("/chat/:id", params_get_by_id, ctrl.get_message_by_id);
router.post("/chat/messages", ctrl.add_new_message);
router.put("/chat/:id", params_get_by_id, ctrl.update_message);
router.delete("/chat/:id", params_get_by_id, ctrl.delete_message);

module.exports = router;