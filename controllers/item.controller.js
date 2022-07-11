const { items: Item } = require('../models');
const { Op } = require("sequelize");
const items = require('../models/items');

class ItemController {
  static async addItem(req, res) {
    try {
      if (!req.body.item_name) throw {
        status: 400,
        message: 'parameter name tidak boleh kosong.'
      }

      if (!req.body.item_price) throw {
        status: 400,
        message: 'parameter price tidak boleh kosong.'
      }

      const newItem = {
        item_name: req.body.item_name,
        item_price: req.body.item_price,
        item_quantity: req.body.item_quantity
      }
  
      await Item.create(newItem);
  
      return res.status(201).json({
        message: 'Berhasil menmbahkan item dengan nama ' + newItem.item_name
      })
    } catch (err) {
      return res
        .status(err.status ||  500)
        .json({ message: err.message || 'Internal server error' })
    }
  }

  static async getByID(req, res) {
    const id = req.params.id;
    try {
      const item = await Item.findByPk(id);
      return res.status(201).json({
        message: 'Berhasil mendapatkan item ' + item.item_name,
        data: Item
      });
    } catch (err) {
      console.log(err);
    }
  }


  static async getAllItem(req, res) {
    const rows = await Item.findAll({
      limit: 10,
      order: [
        ['price']
      ],
      where: {
        price: {
          [Op.between]: [20_000, 40_000]
        }
      }
    });

    return res.status(200).json({
      message: 'Berhasil mendapatkan items',
      data: rows
    })
  }

  static updateItem(req, res) {
    const id = req.params.id;
    const price = req.body.item_price;

    return res.status(200).json({
      message: 'Berhasil merubah item dengan id ' + id,
      newPrice: price
    })
  }

  static async deleteItem(req, res) {
    try {
      if (!req.body.id) throw { status: 400, message: 'parameter id tidak boleh kosong' };

      await items.destroy({
        where: { id: req.body.id }
      });

      return res.status(200).json({
        message: 'Berhasil menghapus item dengan id ' + req.body.id
      })
    } catch (err) {
      return res
        .status(err.status ||  500)
        .json({ message: err.message || 'Internal server error' })
    }
  }
}

module.exports = ItemController;