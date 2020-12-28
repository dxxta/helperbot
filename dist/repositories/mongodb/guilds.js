"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Guilds = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        default: 'w/',
    },
    owner: {
        type: String,
        required: true,
    },
    stuff: {
        type: Map,
        of: Object,
        required: false,
    },
});
exports.default = mongoose_1.model('guilds', Guilds, 'guilds');
