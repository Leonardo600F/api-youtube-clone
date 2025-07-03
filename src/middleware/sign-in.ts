import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

const signIn = (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).json({ error: "Token não fornecido" });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return response.status(401).json({ error: "Formato de token inválido" });
        }

        const token = authHeader.substring(7);

        try {
            const decoded = verify(token, process.env.SECRET as string);
            request.user = decoded;
            next();
        } catch (error) {
            return response.status(401).json({ error: "Token inválido" });
        }
    } catch (error) {
        return response.status(401).json({ error: "Erro na autenticação" });
    }
};

export { signIn };