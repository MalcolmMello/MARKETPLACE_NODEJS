import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JwtAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authorizationHeader = request.headers['authorization'];

        if(authorizationHeader == undefined) {
            throw new Error("Token is missing");
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token) {
            throw new Error("Invalid authentication type");
        };

        try {
            const decodedData = jwt.verify(token, 'teste');

            if(typeof decodedData !== 'object' || !decodedData.id) {
                return response.status(403).json({ message: "Invalid Token" });
            };

            request.userId = decodedData.id;
            if(decodedData.isAdmin) {
                request.userId = decodedData.isAdmin;
            };
            next();
        } catch (error) {
            if(error instanceof Error) {
                return response.status(401).json({ message: error.message });     
            } else {
                return response.status(401).json({ message: "Something went wrong" });
            }
        }
    } catch (error) {
        if(error instanceof Error) {
            return response.status(401).json({message: error.message}).end();
        } else {
            return response.status(401).json({ message: "Something went wrong" }).end();
        };
    }
}

export default JwtAuthMiddleware;