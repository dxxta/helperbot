"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const events_1 = require("events");
class DBWrapper extends events_1.EventEmitter {
    constructor(dir) {
        super();
        this.dir = dir;
        this.models = new Map();
    }
    async load() {
        const filepaths = this.readdirRecursive(this.dir);
        filepaths.forEach((filepath) => {
            filepath = path_1.resolve(filepath);
            const result = require(filepath).default;
            this.models.set(result.modelName.toLowerCase(), result);
        });
        return;
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
}
exports.default = DBWrapper;
