"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class Ready extends __1.default {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
        });
    }
    run(...args) {
        console.log('Im Ready');
    }
}
exports.default = Ready;
