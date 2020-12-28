"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Todo = new mongoose_1.Schema({
    guild: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    values: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.model('todo', Todo, 'todo');
