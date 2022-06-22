const router = require('express').Router();
const itemController = require('../controllers/item.controller');

router.get('/:id', itemController.getByID);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);
router.post('/', itemController.addItem);


module.exports = router;
