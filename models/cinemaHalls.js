const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemaHallsSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        rowCount:{
            type: Number,
            required: true
        },
        columnCount:{
            type: Number,
            required: true
        },
        sections: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

var CinemaHalls = mongoose.model('CinemaHall', cinemaHallsSchema);
module.exports = CinemaHalls;
