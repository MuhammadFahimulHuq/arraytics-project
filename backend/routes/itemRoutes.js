const express = require("express");
const router = express.Router();
const {
  getItem,
  setItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");
router.route("/").get(protect, getItem).post(protect, setItem);
router.route("/:id").put(protect, updateItem).delete(protect, deleteItem);

module.exports = router;
