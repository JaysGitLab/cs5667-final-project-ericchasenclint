const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    name: String,
    wins: Number,
    stillIn: Boolean
});

const Seed = new Schema({
    South: Team,
    East: Team,
    West: Team,
    Midwest: Team,
});

const ContestSchema = new Schema({
    year: {type: Number, min: 2000, max: 3000},
    gender: {type: String, enum: ["Women", "Men"]},
    seeds: [Seed]
});

mongoose.model('Contest', ContestSchema);
