"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotWrapper_1 = __importDefault(require("../BotWrapper"));
class Event extends BotWrapper_1.default {
    constructor(id, { emitter, event, type = 'on', }) {
        super(id);
        this.emitter = emitter;
        this.event = event;
        this.type = type;
    }
}
exports.default = Event;
