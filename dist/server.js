"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const videos_routes_1 = __importDefault(require("./routes/videos.routes"));
const dotenv_1 = require("dotenv");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const cors = require('cors');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use(cors());
app.use(express_1.default.json());
app.use('/user', users_routes_1.default);
app.use('/videos', videos_routes_1.default);
