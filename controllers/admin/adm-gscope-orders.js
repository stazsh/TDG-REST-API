const { orderModel } = require("../../schemas/order");

exports.getGscopeOrders = async (req, res) => {
    try {
        const orderObjs = await orderModel.find({})
                .sort({ createdAt: -1 })
                .limit(req.query.quantity || 1000)
                .skip(((req.query.page - 1) * req.query.quantity) || 0);
        
        return res.status(200).json({
            success: true,
            message: 'GET Acknowledged',
            payload: orderObjs
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: process.env.DEBUG_MODE ? e.message : 'An error was encountered, check your request and try again'
        });
    }
};