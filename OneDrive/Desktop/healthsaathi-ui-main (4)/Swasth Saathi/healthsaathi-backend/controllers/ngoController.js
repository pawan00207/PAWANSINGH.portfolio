const NGO = require('../models/NGO');
exports.listNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find().sort({ createdAt: -1 }).limit(100);
    res.json(ngos);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.createNGO = async (req, res) => {
  try {
    const { name, description, website, contact, tags } = req.body;
    const ngo = new NGO({ name, description, website, contact, tags });
    await ngo.save();
    res.status(201).json(ngo);
  } catch (err) { res.status(400).json({ message: err.message }); }
};
exports.getNGO = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: 'Not found' });
    res.json(ngo);
  } catch (err) { res.status(500).json({ message: err.message }); }
};