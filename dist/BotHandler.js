"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const events_1 = require("events");
const discord_js_1 = require("discord.js");
const BotWrapper_1 = __importDefault(require("./BotWrapper"));
class BotHandler extends events_1.EventEmitter {
    constructor(client, others) {
        super();
        this.client = client;
        this.extensions = new Set(others.extensions || ['.js', '.ts']);
        this.dir = others.dir;
        this.moduleHandle = others.moduleHandle || BotWrapper_1.default;
        this.modules = new discord_js_1.Collection();
    }
    readdirRecursive(directory) {
        const result = [];
        (function read(dir) {
            const files = fs_1.readdirSync(dir);
            for (const file of files) {
                const filepath = path_1.join(dir, file);
                if (fs_1.statSync(filepath).isDirectory()) {
                    read(filepath);
                }
                else {
                    result.push(filepath);
                }
            }
        })(directory);
        return result;
    }
    async preload(module, filepath) {
        module.filepath = filepath;
        module.client = this.client;
        module.handler = this;
        this.modules.set(module.id, module);
        console.info(`Command ${module.id} has ready ✅`);
    }
    async load(file) {
        const isClass = typeof file === 'function';
        if (!isClass && !this.extensions.has(path_1.extname(file))) {
            return undefined;
        }
        let module = isClass ? file : require(file).default;
        if (module && module.prototype instanceof this.moduleHandle) {
            module = new module(this);
        }
        else {
            if (!isClass) {
                delete require.cache[require.resolve(file)];
            }
            return undefined;
        }
        if (this.modules.has(module.id))
            throw new Error('Sudah Ke Load !!');
        await this.preload(module, isClass ? null : file);
        return module;
    }
    async loadAll() {
        const filepaths = this.readdirRecursive(this.dir);
        filepaths.forEach((filepath) => {
            filepath = path_1.resolve(filepath);
            this.load(filepath);
        });
        return this;
    }
}
exports.default = BotHandler;
