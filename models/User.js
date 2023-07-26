const {
    Schema,
    model
} = require("mongoose");

//user schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    }, ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }, ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

//shows the friend count as a virtual
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

//instantiated the user model
const User = model("User", userSchema)


module.exports = User;