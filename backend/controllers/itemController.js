const asynchandler = require("express-async-handler");

//@desc get item
//@route GET api/item
//@access PRIVATE
const getItem = asynchandler(async (req, res) => {
  res.status(200).json({
    message: "This a message",
  });
});

//@desc set item
//@route POST api/item
//@access PRIVATE
const setItem = asynchandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  res.status(200).json({
    message: "This a message",
  });
});

//@desc Update item
//@route PUT api/item/:id
//@access PRIVATE
const updateItem = asynchandler(async (req, res) => {
  res.status(200).json({
    message: "This a message",
  });
});

//@desc delete item
//@route DELETE api/item/:id
//@access PRIVATE
const deleteItem = asynchandler(async (req, res) => {
  res.status(200).json({
    message: "This a message",
  });
});

module.exports = {
  getItem,
  setItem,
  updateItem,
  deleteItem,
};
