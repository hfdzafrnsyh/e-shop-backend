const OrderItems = require('../models/OrderItemsModel');
const Order = require('../models/OrderModel');


module.exports.getOrder = (req, res) => {

    Order.find()
        .populate('user', 'name email')
        .sort({ 'dateOrdered': -1 })
        .then(orders => {
            if (!orders) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Orders"
                })
            }
            res.status(200).json({
                success: true,
                order: orders
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "500 Internal Server Error",
                error: err
            })
        })
}

module.exports.addOrder = async (req, res) => {

    const orderItemsId = req.body.orderItems.map(orderItem => {
        let newOrderItems = new OrderItems({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItems.save();

        return newOrderItems._id;
    })

    // total price
    const totalPrices = await Promise.all(orderItemsId.map(async orderId => {
        const orderItem = await OrderItems.findById(orderId).populate('product', 'price')
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice;
    }))

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0)


    let newOrder = new Order({
        orderItems: orderItemsId,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    })


    newOrder.save()
        .then(order => {
            res.status(201).json({
                success: true,
                message: "Success Order",
                order: order
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "500 Internal Server Error",
                error: err
            })
        })

}

module.exports.getOrderById = (req, res) => {

    Order.findById(req.params.id)
        .populate('user')
        .populate(
            {
                path: 'orderItems',
                populate: { path: 'product', populate: 'category' }
            })
        .then(orders => {
            if (!orders) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Orders"
                })
            }
            res.status(200).json({
                success: true,
                order: orders
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "500 Internal Server Error",
                error: err
            })
        })

}

module.exports.updateOrder = (req, res) => {

    Order.findByIdAndUpdate(req.params.id)
        .then(order => {

            order.status = req.body.status

            order.save()
                .then(orders => {
                    res.status(200).json({
                        success: true,
                        message: "Update Ordered Success",
                        order: orders
                    })
                })
                .catch(err => {
                    res.status(404).json({
                        success: false,
                        message: "Failed Update Category, Nothing Id",
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "500 Internal Server Error",
                error: err
            })
        })


}




module.exports.removeOrder = (req, res) => {

    Order.findByIdAndRemove(req.params.id)
        .then(orderId => {
            if (!orderId) {
                return res.status(404).json({
                    success: false,
                    message: "Delete Fail orderId not found"
                })
            }

            orderId.orderItems.map(async order => {
                await OrderItems.findOneAndRemove(order)
            })

            return res.status(200).json({
                success: true,
                message: "Delete Successfuly"
            })

        })
        .catch(err => res.status(400).json({
            success: false,
            message: "Error Bad Request",
            error: err
        }))

}


module.exports.getTotalSales = async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalSales' } } }
    ])

    if (!totalSales) {
        res.status(404).json({
            success: false,
            message: "Error nothing totalSales"
        })
    }

    res.status(200).json({
        success: true,
        message: "SuccessFfully get TotalSales",
        totalSales: totalSales.pop().totalsales
    })

}

module.exports.getOrderCount = async (req, res) => {
    const orderCount = await Order.countDocuments((count) => count)

    if (!orderCount) {
        res.status(404).json({
            success: false,
            message: "Error nothing orderCount"
        })
    }

    res.status(200).json({
        success: true,
        message: "Successfully get OrderCount",
        orderCount: orderCount
    })
}

module.exports.getUserOrder = async (req, res) => {
    const userOrderList = await Order.find({ user: req.params.userId })
        .populate({
            path: 'orderItems', populate: { path: 'product', populate: 'category' }
        }).sort({ 'dateOrdered': -1 })
    if (!userOrderList) {
        res.status(404).json({
            success: false,
            message: "Error nothing orderList"
        })
    }

    res.status(200).json({
        success: true,
        message: "Successfully get User Order List",
        userOrderList: userOrderList
    })


}