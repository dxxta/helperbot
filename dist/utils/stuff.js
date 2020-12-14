"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoCallable = exports.intoArray = void 0;
exports.intoArray = (x) => (Array.isArray(x) ? x : [x]);
exports.intoCallable = (thing) => {
    if (typeof thing === 'function') {
        return thing;
    }
    return () => thing;
};
