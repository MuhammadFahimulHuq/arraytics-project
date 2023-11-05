const asynchandler = require("express-async-handler");
const Item = require("../models/itemModal");
const User = require("../models/userModal");
//@desc get item
//@route GET api/item
//@access PRIVATE
const getItem = asynchandler(async (req, res) => {
  const items = await Item.find({ user: req.user });
  res.status(200).json(items);
});

//@desc set item
//@route POST api/item
//@access PRIVATE
const setItem = asynchandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated");
  }
  const item = await Item.create({
    name: req.body.name,
    user: req.user._id,
  });
  res.status(200).json(item);
});

//@desc Update item
//@route PUT api/item/:id
//@access PRIVATE
const updateItem = asynchandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (item.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedItem);
});

//@desc delete item
//@route DELETE api/item/:id
//@access PRIVATE
const deleteItem = asynchandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (item.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await item.deleteOne();

  res.status(200).json({
    message: `Deleted item ${req.params.id}`,
  });
});

module.exports = {
  getItem,
  setItem,
  updateItem,
  deleteItem,
};
