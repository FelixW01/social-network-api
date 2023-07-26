const {
    Schema,
    model,
    Types
} = require('mongoose');
const moment = require('moment')

//reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: date => moment(date).format("MMM DD, YYY [at] hh:mm a")
    },
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
        get: date => moment(date).format("MMM DD, YYY [at] hh:mm a")
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

//shows the reaction count as a virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

//instantiates the model
const Thought = model("Thought", thoughtSchema);



module.exports = Thought;