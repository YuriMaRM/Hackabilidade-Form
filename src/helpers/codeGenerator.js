// Dependências
import { sign } from "jws";


// Cria token jws
export const createToken = async (payload) => {
    try {
        return sign({
                header: {
                    "typ": "JWT",
                    "alg": "HS256"
                },
                payload: payload,
                secret: process.env.JWT_SECRET_KEY,
            });
    } catch (error) {
        throw error;
    };
};

// Cria uma string aleatoria com o tamanho informado
export const randomString = length => {
    try {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));

        return result;
    } catch (error) {
        throw error;
    };
};