const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  project: {
    id: mongoose.Types.ObjectId,
  },

  transac_id: {
    id: String,
  },

  user_id: {
    id: mongoose.Types.ObjectId,
  },

  bank_tran_id: {
    id: String,
  },

  amount: {
    type: String,
  },

  currency: {
    type: String,
  },

  card_issuer: {
    type: String,
  },

  card_brand: {
    type: String,
  },
  card_issue_country: {
    type: String,
  },

  trans_date: {
    type: Date,
  },

  annonymous_amount: {
    type: String,
  },
});

TransactionSchema.methods = {
  InsertTransaction: function (obj) {
    const newTransac = mongoose.model("Transaction");
    return newTransac(obj);
  },
};

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = {
  Transaction,
};
