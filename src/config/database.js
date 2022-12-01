const mongoose = require("mongoose");

exports.connect = async () => {
  // connect to DB
  await mongoose
    .connect(process.env.DBURI, { useNewUrlParser: true })
    .then(() => console.log("DB Connection Sucessfull"))
    .catch((err) => {
      console.log(err);
    });
};
