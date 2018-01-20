var mongoose = require("mongoose")
var CompanionSchema = require("./companion")

mongoose.Promise = global.Promise;

var CartSchema = new mongoose.Schema({
	tvcart: Array,
	moviecart: Array,
	phone_number: String,
	companion: {type: mongoose.Schema.Types.ObjectId, ref: 'Companion'}
})

console.log("calling CartSchema")

//var User = mongoose.model("User", userSchema.UserSchema)

module.exports = mongoose.model("Cart", CartSchema)     