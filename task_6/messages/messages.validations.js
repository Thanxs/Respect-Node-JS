const mongoose = require("mongoose");

exports.params_get_by_id = (req, res, next) => {
  const { id } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (isValid) {
    next();
  } else {
    throw new Error("Id is not valid!");
  }
};
