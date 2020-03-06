const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatsSchema = new Schema({
        cinemeHall:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CinemaHall'
        },
        row:{
            type: Number,
            required: true
        },
        column:{
            type: Number,
            required: true
        },
        status: {
            type: String
        },
        showTime: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShowTime'
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

var Seats = mongoose.model('Seat', seatsSchema);
module.exports = Seats;
