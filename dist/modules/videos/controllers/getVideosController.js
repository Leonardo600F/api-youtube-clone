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
exports.getVideosController = getVideosController;
const getVideosUseCase_1 = require("../useCases/getVideosUseCase");
function getVideosController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const user_id = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!user_id) {
            return response.status(400).json({ error: "user_id é obrigatório." });
        }
        try {
            const videos = yield (0, getVideosUseCase_1.getVideosUseCase)(user_id);
            return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos });
        }
        catch (error) {
            return response.status(400).json({ error: error.message });
        }
    });
}
