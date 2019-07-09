var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ImageScheme = new Schema({
    img: { data: Buffer, contentType: String}
}, {
    timestamps: true
});
module.exports = ImageScheme;