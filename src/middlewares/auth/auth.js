// Dendências
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Helpers
import log from "../../helpers/log.js";


// Services
import errorHandler from "../../services/error-handler.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/../../.env` });


export const tokenAuthValidator = async (req, res, next) => {
    const authorization = true;
    try {
        if (authorization) {
            req.user = {id: 1, type: 1};
            return next()
        }
    } catch (error) {
        errorHandler(res, error);
    };
};

export const tokenFormValidator = async (req, res, next) => {
    const token = req.headers.form?.split(' ')[1] || req.headers.form;
    try {
        if (token)
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (decoded) req.idForm = decoded.formulario;
                else req.idForm = null;
            });
        else req.idForm = null;
        if(req.idForm)
            log.cyan(`Candidato ${req.user.id} esta fazendo o formulario de id ${req.idForm}!!!`);
        next();

    } catch (error) {
        errorHandler(res, error);
    };
};