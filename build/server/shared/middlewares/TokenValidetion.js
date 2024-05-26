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
exports.TokemValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const JWTtoken_1 = require("../services/JWTtoken");
const TokemValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: "Não autenticado" }
        });
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: "Não autenticado" }
        });
    }
    const jwtData = JWTtoken_1.JWTtoken.verify(token);
    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: 'Erro ao verificar o token' }
        });
    }
    else if (jwtData === 'INVALID_TOKEN') {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' }
        });
    }
    return next();
});
exports.TokemValidation = TokemValidation;
