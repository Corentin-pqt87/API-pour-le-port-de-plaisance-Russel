const Catway = require('../models/catways');

// Ajouter un catway
exports.addCatway = async (req, res) => {
    try {
        const { catwayNumber, catwayType, catwayState } = req.body;
        const catway = new Catway({ catwayNumber, catwayType, catwayState });
        await catway.save();
        res.status(201).json(catway);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un catway par l'id CatwayNumber
exports.getCatwayByNumber = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.number });
        if (!catway) return res.status(404).json({ message: "Catway not found" });
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise a jour d'un catway
exports.updateCatwayState = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.number });
        if (!catway) return res.status(404).json({ message: "Catway not found" });

        catway.catwayState = req.body.catwayState;
        await catway.save();
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
    try {
        const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.number });
        if (!catway) return res.status(404).json({ message: "Catway not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
