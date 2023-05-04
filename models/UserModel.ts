import mongoose from 'mongoose';


const UserSchema: mongoose.Schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favoriteClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: false
    },
});

UserSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'favoriteClass',
    });
    next();
});

UserSchema.pre(/^save/, function (next) {
    this.populate({
        path: 'favoriteClass',
    });
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;