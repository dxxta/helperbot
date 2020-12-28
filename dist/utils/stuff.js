"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoCallable = exports.intoArray = void 0;
const intoArray = (x) => (Array.isArray(x) ? x : [x]);
exports.intoArray = intoArray;
const intoCallable = (thing) => {
    if (typeof thing === 'function') {
        return thing;
    }
    return () => thing;
};
exports.intoCallable = intoCallable;
