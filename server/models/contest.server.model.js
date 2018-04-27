const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    name: String,
    wins: Number,
    stillIn: Boolean
});

const Seed = new Schema({
    North: Team,
    South: Team,
    East: Team,
    West: Team
});

const RegionSeed = new Schema({
    seed: Number,
    region: String
});

const Entry = new Schema({
    name: String,
    email: String,
    RegionsBySeed: [String]
});

const ContestSchema = new Schema({
    year: {type: Number, min: 2000, max: 3000},
    gender: {type: String, enum: ["Women", "Men"]},
    seeds: [Seed],
    entries: [Entry]
});

mongoose.model('Contest', ContestSchema);
