const router = require('express').Router();
const { Category, Product } = require('../../models');

  // find all categories
router.get('/', async (req, res) => {
  try {
    const catInfo = await Category.findAll ({
      include: [{model: Product}]
    });
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const catInfo = await Category.findByPk( req.params.id, {
      include: [{model: Product}]
    });
    if (!catInfo) {
      res.status(404).json({message: 'ID not found'});
      return;
    }
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catInfo = await Category.create(req.body);
    res.status(200).json(catInfo);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const catInfo = await Category.update(req.body , {
      where: {
        id: req.params.id,
      },
    });
    if (!catInfo) {
      res.status(404).json({message: 'ID not found'});
      return;
    }
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catInfo = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!catInfo) {
      res.status(404).json({message: 'ID not found'});
      return;
    }
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
