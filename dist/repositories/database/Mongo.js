"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DBWrapper_1 = __importDefault(require("./DBWrapper"));
class Mongo extends DBWrapper_1.default {
    constructor(uri, options) {
        super(options.dir);
        this.uri = String(uri);
        this.items = new Map();
    }
    async connect() {
        mongoose_1.default.connect('mongodb+srv://mamank:indonesia@cluster0.o1xee.mongodb.net/bot?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        this.conn = mongoose_1.default.connection;
    }
    async load() {
        super.load();
        try {
            await this.connect();
        }
        catch (message) {
            throw new Error(JSON.stringify({
                name: 'load-resolver',
                code: new Date().getMilliseconds(),
                from: process.cwd(),
                message,
            }));
        }
    }
    async resolveModel(id) {
        if (this.models.has(id)) {
            return this.models.get(id);
        }
        throw new Error(JSON.stringify({
            name: 'model-resolver',
            code: new Date().getMilliseconds(),
            from: process.cwd(),
            message: 'model doesnt exist',
        }));
    }
    async get(model, query) {
        try {
            const data = await this.resolveModel(model);
            return data === null || data === void 0 ? void 0 : data.find(query);
        }
        catch (message) {
            throw new Error(JSON.stringify({
                name: 'get',
                code: new Date().getMilliseconds(),
                from: process.cwd(),
                message,
            }));
        }
    }
    async has(model, condition) {
        try {
            const data = await this.resolveModel(model);
            return data ? data.exists(condition) : false;
        }
        catch (message) {
            throw new Error(JSON.stringify({
                name: 'has-data',
                code: new Date().getMilliseconds(),
                from: process.cwd(),
                message,
            }));
        }
    }
    async getById(model, id) {
        try {
            const data = await this.resolveModel(model);
            return data === null || data === void 0 ? void 0 : data.findById(id).exec();
        }
        catch (message) {
            throw new Error(JSON.stringify({
                name: 'get-by-id',
                code: new Date().getMilliseconds(),
                from: process.cwd(),
                message,
            }));
        }
    }
    async getAll(model) {
        try {
            const data = await this.resolveModel(model);
            return data === null || data === void 0 ? void 0 : data.find().exec();
        }
        catch (message) {
            throw new Error(JSON.stringify({
                name: 'get-all',
                code: new Date().getMilliseconds(),
                from: process.cwd(),
                message,
            }));
        }
    }
    async add(model, newData, opts) {
        try {
            const data = await this.resolveModel(model);
            return await new data(newData).save(Object.assign(this, {
                ...opts,
                timestamps: true,
            }));
        }
        catch (message) {
            throw new Error(JSON.stringify({
                name: 'add',
                code: new Date().getMilliseconds(),
                from: process.cwd(),
                message,
            }));
        }
    }
    async setOne(model, query, newData, opts) {
        try {
            const data = await this.resolveModel(model);
            return await data.updateOne(query, newData, { upsert: false, ...opts });
        }
        catch (message) {
            throw new Error(JSON.stringify({
                name: 'set-one',
                code: new Date().getTime(),
                from: process.cwd(),
                message,
            }));
        }
    }
    async DeleteOne(model, query, opts) {
        try {
            const data = await this.resolveModel(model);
            return await data.deleteOne(query, opts);
        }
        catch (message) {
            throw new Error(JSON.stringify({
                name: 'set-one',
                code: new Date().getTime(),
                from: process.cwd(),
                message,
            }));
        }
    }
}
exports.default = Mongo;
