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

const User = mongoose.model('User', UserSchema);

export default User;