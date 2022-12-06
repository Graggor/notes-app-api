const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username not provided"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password not provided"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
})

UserSchema.pre('save', function(next){
    this.password = this.encryptPassword(this.password)
    next()
})

UserSchema.methods = {
    authenticate: function(plainTextPassword){
        return bcrypt.compareSync(plainTextPassword, this.password)
    },
    encryptPassword: function(plainTextPassword){
        var salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(plainTextPassword, salt)
    },
    toJson: function(){
        var obj = this.toObject();
        delete obj.password
        return obj
    }
}

UserSchema.plugin(uniqueValidator, {message: '{PATH} already taken.'})

// Export model
module.exports = mongoose.model('User', UserSchema)
