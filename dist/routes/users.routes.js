"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sign_in_1 = require("../middleware/sign-in");
const usersRepository_1 = __importDefault(require("../modules/users/repositories/usersRepository"));
const usersRoutes = (0, express_1.Router)();
const usersRepository = new usersRepository_1.default();
usersRoutes.post('/sign-up', (request, response) => {
    usersRepository.createUser(request, response);
});
usersRoutes.post('/sign-in', (request, response) => {
    usersRepository.signIn(request, response);
});
usersRoutes.get('/get-user', sign_in_1.signIn, (request, response) => {
    usersRepository.getUser(request, response);
});
exports.default = usersRoutes;
