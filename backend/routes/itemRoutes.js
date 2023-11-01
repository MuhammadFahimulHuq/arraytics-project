const express = require("express");
const router = express.Router();
const {
  getItem,
  setItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.route("/").get(getItem).post(setItem);
router.route("/:id").put(updateItem).delete(deleteItem);

module.exports = router;
