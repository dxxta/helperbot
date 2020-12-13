"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _1 = __importDefault(require("."));
const BotHandler_1 = __importDefault(require("../BotHandler"));
class EventHandler extends BotHandler_1.default {
    constructor(client, { dir, moduleHandle = _1.default, extensions = ['.js', '.ts'], }) {
        super(client, {
            dir,
            moduleHandle,
            extensions,
        });
        this.emitters = new discord_js_1.Collection();
        this.emitters.set('client', this.client);
    }
    async preload(event, filepath) {
        super.preload(event, filepath);
        try {
            event.run = event.run.bind(event);
            this.addToEmitter(event.id);
        }
        catch (error) {
            console.log(error);
        }
    }
    checkIsEventEmitter(event) {
        return (event &&
            typeof event.on === 'function' &&
            typeof event.emit === 'function');
    }
    setEmitters(emitters) {
        for (const [key, value] of Object.entries(emitters)) {
            if (!this.checkIsEventEmitter(value))
                throw new Error('event invalid');
            this.emitters.set(key, value);
        }
        return this;
    }
    addToEmitter(id) {
        const TheEvent = this.modules.get(id.toString());
        if (!TheEvent)
            throw new Error('event ga ada');
        const emitter = this.checkIsEventEmitter(TheEvent)
            ? TheEvent.emitter
            : this.emitters.get(TheEvent.emitter);
        if (!this.checkIsEventEmitter(emitter))
            throw new Error('emitter ga ada');
        if (TheEvent.type === 'once') {
            emitter.once(TheEvent.event, TheEvent.run);
            return TheEvent;
        }
        emitter.on(TheEvent.event, TheEvent.run);
        return TheEvent;
    }
}
exports.default = EventHandler;
