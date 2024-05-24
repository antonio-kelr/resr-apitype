"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordCrypot = void 0;
const bcrypt_1 = require("bcrypt");
const SATL_PASSOWRD = 8;
const hasPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const satlGenerated = yield (0, bcrypt_1.genSalt)(SATL_PASSOWRD);
    return yield (0, bcrypt_1.hash)(password, satlGenerated);
});
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.compare)(password, hashedPassword);
});
exports.PasswordCrypot = {
    hasPassword,
    verifyPassword
};
