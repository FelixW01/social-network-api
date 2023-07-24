const {
    Schema,
    model
} = require("mongoose");
const formatDate = require('../utils/date-format.js')

//reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Tyles.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => formatDate(date)
    }
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});


//thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => formatDate(date)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

const Thought = model("Thought", thoughtSchema);
userSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})



module.exports = Thought;
