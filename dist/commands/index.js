"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotWrapper_1 = __importDefault(require("../BotWrapper"));
class Command extends BotWrapper_1.default {
    constructor(id, options) {
        super(id);
        this.alias = options.alias;
        this.details = options.details;
        this.userPerms = options.userPerms;
        this.cooldown = options.cooldown;
        this.blockBots = Boolean(options.blockBots || true);
        this.channel = options.channel || 'both';
        this.limit = options.limit || 2;
        this.ownerOnly = Boolean(options.ownerOnly || false);
        this.typing = Boolean(options.typing || false);
        this.ignoreCooldown =
            typeof options.ignoreCooldown === 'function'
                ? options.ignoreCooldown.bind(this)
                : options.ignoreCooldown;
    }
    prerun(msg) {
        return true;
    }
}
exports.default = Command;
