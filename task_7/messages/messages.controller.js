const MessagesModel = require("./messages.model");

exports.get_messages_handler = async (req, res, next) => {
    try {
        const { skip, limit, direction } = req.query;
        let { sort } = req.query;
        let total;

        if (sort === "messages") {
            sort = `count.${sort}`;
        }

        if (!skip) {
            total = await MessagesModel.find({}).countDocuments();
        }

        const messages = await MessagesModel.find({})
            .sort({ [sort || "createdAt"]: direction })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();

        console.log(messages);

        res.send(messages);
    } catch (err) {
        next(err);
    }
};

exports.get_message_by_id = async (req, res, next) => {
    try {
        const message = await MessagesModel.findById(req.params.id)
            .lean()
            .exec();

        console.log(message);

        res.send(message);
    } catch (err) {
        next(err);
    }
};

exports.add_new_message = async (req, res, next) => {
    try {
        const message = await MessagesModel.create(req.body);
        console.log(message);
        res.send(message);
    } catch (err) {
        next(err);
    }
};

exports.update_message = async (req, res, next) => {
    try {
        const message = await MessagesModel.findById(req.params.id).exec();

        if (!message) return next(new Error("Message Not Found"));

        Object.assign(message, req.body);

        message.updatedAt = new Date();

        await message.save();

        res.send(message);
    } catch (err) {
        next(err);
    }
};

exports.delete_message = async (req, res, next) => {
    try {
        const message = await CompanyModel.findById(req.params.id).exec();

        await message.save();

        res.send(message);
    } catch (err) {
        next(err);
    }
};
