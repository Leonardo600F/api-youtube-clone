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
exports.searchVideosController = searchVideosController;
const searchVideosUseCase_1 = require("../useCases/searchVideosUseCase");
function searchVideosController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { search } = request.query;
        if (!search) {
            return response.status(400).json({ error: "Termo de busca é obrigatório." });
        }
        try {
            const videos = yield (0, searchVideosUseCase_1.searchVideosUseCase)(String(search));
            return response.status(200).json({ message: "Vídeos retornados com sucesso.", videos });
        }
        catch (error) {
            return response.status(400).json({ error: error.message });
        }
    });
}
