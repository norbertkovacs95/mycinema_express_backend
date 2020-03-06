const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showTimesSchema = new Schema({
        cinemeHall:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CinemaHall'
        },
        startDate:{
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

var ShowTimes = mongoose.model('ShowTime', showTimesSchema);
module.exports = ShowTimes;
