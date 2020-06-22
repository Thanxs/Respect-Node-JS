const { Schema, model } = require("mongoose");

const messagesSchema = new Schema(
    {
        text: {
            type: String,
            trim: true
        },
        sender: {
            type: String,
            trim: true
        }
    },
    {
        collection: "messages",
        timestamps: true
    }
);

messagesSchema.pre("save", async function(next) {
    if (this.isModified("messages")) {
        this.count.messages = this.messages.length;
    }

    next();
});

module.exports = model("MessagesModel", messagesSchema);
