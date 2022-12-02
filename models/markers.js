const mongoose = require('mongoose');

const markerSchema = mongoose.Schema({
    nickname: String,
    name: String,
    latitude: Number,
    longitude: Number,
});

const Marker = mongoose.model('markers', markerSchema);

module.exports = Marker;