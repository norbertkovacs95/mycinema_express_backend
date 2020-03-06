const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        director:{
            type: String,
            required: true
        },
        synopsis:{
            type: String,
            required: true
        },
        pegiRating:{
            type: String,
            required: true
        },
        duration:{
            type: Number,
            required: true
        },
        posterPath:{
            type: String,
            required: true
        },
        uploadDate:{
            type: String,
            required: true
        },
        featured:{
            type: Boolean,
            default: false
        },
        coverPath:{
            type: String
        },
        showTimes: [{ type : mongoose.Schema.Types.ObjectId, ref: 'ShowTime' }],
    },
    {
        timestamps: true
    }
);

var Movies = mongoose.model('Movie', movieSchema);
module.exports = Movies;
