const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  id_personne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personne",
    required: true,
  },
  titre: { type: String, required: true },
  contenu: { type: String, required: true },
  status: { type: String, enum: ['attente', 'accepter', 'refuser', 'terminer'], default: 'attente' },
});

module.exports = mongoose.model("Note", noteSchema);
