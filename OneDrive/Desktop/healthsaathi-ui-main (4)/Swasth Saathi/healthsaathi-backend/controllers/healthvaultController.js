const Resource = require('../models/Resource');
exports.listResources = async (req, res) => {
  try {
    const resources = await Resource.find({ type: 'healthvault' }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.createResource = async (req, res) => {
  try {
    const { title, summary, contentUrl, tags } = req.body;
    const r = new Resource({ title, summary, contentUrl, tags, type: 'healthvault' });
    await r.save();
    res.status(201).json(r);
  } catch (err) { res.status(400).json({ message: err.message }); }
};
exports.getResource = async (req, res) => {
  try {
    const r = await Resource.findById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json(r);
  } catch (err) { res.status(500).json({ message: err.message }); }
};