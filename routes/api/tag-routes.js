const router = require('express').Router();
const { rest } = require('lodash');
const { Tag, Product, ProductTag } = require('../../models');


  // find all Tags
router.get('/', async (req, res) => {
  try {
    const tagInfo = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err)
  }
});

  // Find a tag by it's ID
router.get('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if(!tagInfo) {
      res.status(404).json({message: 'ID not found'});
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  };
});

  // Creating a new Tag
router.post('/',  async (req, res) => {
  try {
    const tagInfo = await Tag.create({
      tagName: req.body.tagName,
    });
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // Update a tag by it's ID
router.put('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.update(req.body , {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // Delete a tag by it's ID
router.delete('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagInfo) {
      res.status(404).json({message: 'ID not found'});
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
