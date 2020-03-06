const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
        rowCount:{
            type: Number,
            required: true
        },
        columnCount:{
            type: Number,
            required: true
        },
        cinemaHall: {
            type: mongoose.Types.ObjectId,
            ref: 'CinemaHall'
        },
        colStart: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

var Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
