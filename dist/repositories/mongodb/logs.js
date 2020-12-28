"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Logs = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    error: {
        type: Array,
        required: false,
    },
    changes: {
        type: Array,
        required: false,
    },
});
exports.default = mongoose_1.model('logs', Logs, 'logs');
