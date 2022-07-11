const { orders: OrderModel } = require('../models');
const { items: ItemModel } = require('../models');
const { orders: Order } = require('../models');

exports.getAllOrders = (req, res) => {
  return res.status(200).json({
    message: 'Berhasil mendapatkan Order'
  })
}

exports.getOrder = (req, res) => {
  return res.status(200).json({
    message: 'Berhasil mendapatkan Order dengan id ' + req.params.id
  })
}

exports.createOrder = async (req, res) => {
  try {
    const item_id = req.body.item_id;
    const user_id = req.body.user_id;
    const order_quantity = req.body.order_quantity;


    const orderItem = await ItemModel.findOne({
      where: {
        id: item_id
      }
    });

    const newOrder = {
      users_id: user_id,
      items_id: item_id,
      order_quantity: order_quantity,
      amount: orderItem.dataValues.item_price * order_quantity
    }
  
    await OrderModel.create(newOrder);
  
    return res.status(201).json({
      message: 'Berhasil membuat Order'
    })
  } catch (err) {
    return res
      .status(err.status ||  500)
      .json({ message: err.message || 'Internal server error' })
  }
}

exports.updateOrder = async (req, res) => {
    try {
        await Order.update({ order_quantity: req.body.order_quantity }, {
          where: {
            id: req.body.id
          }
        });
      
        return res.status(200).json({
          message: 'Berhasil mengubah order'
        })
      } catch (err) {
        return res
          .status(err.status || 500)
          .json({
            message: err.message || 'Internal server error.',
          })
      }
    }

exports.deleteOrder = async (req, res) => {
    try {
        if (!req.params.id) throw { status: 400, message: 'parameter id tidak boleh kosong' };
  
        await Order.destroy({
          where: { id: req.params.id }
        });
  
        return res.status(200).json({
          message: 'Berhasil menghapus order dengan id ' + req.params.id
        })
      } catch (err) {
        return res
          .status(err.status ||  500)
          .json({ message: err.message || 'Internal server error' })
      }
    }