const { orderModel } = require("../../schemas/order");
const { getLocalTime } = require("../../utils/local-time");

exports.getGscopeOrdersHandler = async (req, res) => {
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

exports.postGscopeOrdersStatusHandler = async (req, res) => {
    try {
        if (!req.query.id)
            return res.status(400).json({
                success: false,
                message: '`id` query parameter missing'
            });
        
        const orderObj = await orderModel.findOne({ _id: req.query.id });
        orderObj.status = req.body;
        await orderObj.save();
    } catch (e) {
        res.status(500).json({
            success: false,
            message: process.env.DEBUG_MODE ? e.message : 'An error was encountered, check your request and try again'
        });
    }
};