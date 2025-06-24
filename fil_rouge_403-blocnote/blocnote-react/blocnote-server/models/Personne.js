const mongoose = require("mongoose");

const personneSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  numero: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  }
});

module.exports = mongoose.model("Personne", personneSchema);
