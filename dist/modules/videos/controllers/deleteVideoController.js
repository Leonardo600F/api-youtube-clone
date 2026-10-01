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
exports.deleteVideoController = deleteVideoController;
const deleteVideoUseCase_1 = require("../useCases/deleteVideoUseCase");
function deleteVideoController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { video_id } = request.params;
        const user_id = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!video_id) {
            return response.status(400).json({ error: "video_id é obrigatório." });
        }
        if (!user_id) {
            return response.status(401).json({ error: "Usuário não encontrado." });
        }
        try {
            const result = yield (0, deleteVideoUseCase_1.deleteVideoUseCase)(video_id, user_id);
            return response.status(200).json(result);
        }
        catch (error) {
            return response.status(400).json({ error: error.message });
        }
    });
}
