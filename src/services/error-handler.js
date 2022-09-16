// Helpers
import log from "../helpers/log.js";
//import escape from "../helpers/escape.js";

// Models
// import * as modelError from "../models/error/error.js";

// Services
//import { deleteFile } from "./dir.js";

const status = [
    { code: 207, defaultMessage: "Múltiplos status retornados. Verifique o body para mais informações." },
    { code: 400, defaultMessage: "Houve um erro interno ao tentar fazer a solicitação para o servidor, tente novamente. Se o problema persistir, por favor contate-nos." },
    { code: 401, defaultMessage: "Não foi possível identificá-lo. Por favor, faça login." },
    { code: 403, defaultMessage: "Você não tem permissão para realizar o procedimento!" },
    { code: 404, defaultMessage: "Não foi possível encontrar a rota solicitada, tente novamente. Se o problema persistir, por favor contate-nos." },
    { code: 409, defaultMessage: "Houve algum conflito inesperado com os dados, tente novamente. Se o problema persistir, por favor contate-nos." },
    { code: 415, defaultMessage: "O formato enviado não é suportado. Por favor, tente novamente." },
    { code: 500, defaultMessage: "Houve um erro interno, tente novamente. Se o problema persistir, por favor contate-nos." },
];

const errorHandler = (res, error, idUsuario, statusCode = 500, dados) => {
    let cause;
    let multistatus;

    let message;
    let descricao;
    let files;

    if (typeof dados === "object") {
        cause = dados.cause;
        message = dados.message;
        descricao = dados.descricao;
        files = dados.files;
    } else
        descricao = dados;

    // Reformata o erro caso haja dados na mensagem (Geralmente quando dado throw manualmente onde não pode-se chamar o errorHandler)
    try {
        if (typeof JSON.parse(error.message) === "object") {
            const parsedError = JSON.parse(error.message);

            if (status.map(stat => stat.code).includes(parsedError.code)) {
                error.message = `${parsedError.descricao}\n    at ${error.stack.split(" at ").filter((words, index) => index !== 0).join(" at ")}`;

                statusCode = parsedError.code || statusCode;
                message = parsedError.message;
                descricao = parsedError.descricao || null;
                cause = parsedError.cause || undefined;
                multistatus = parsedError.multistatus || undefined;
            };
        };
    } catch (error) { };

    // Deleta todos os arquivos salvos antes do erro
    try {
        if (files?.length && status.map(stat => stat.code).includes(statusCode) && statusCode != 207) {
            files = files.map(file => file.path.split("uploads")[1].split('\\').join("/"));
            log.yellow(`${files.length} arquivos não aceitos serão deletados`);

            //files.forEach(path => deleteFile(path));
            log.yellow(`Os arquivos enviados pelo usuário não foram aceitos e foram excluídos: ${files.join(", ")}`);
        };
    } catch (error) {
        log.yellow("Erro inesperado que foi ignorado");
        log.red(error);
    };


    // Coloca mensagem padrão caso não tenha mensagem
    if (!message)
        message = status.find(stat => stat.code == statusCode)?.defaultMessage || "Erro não identificado";

    // Se for um erro 400 e tiver error.message, retorna a causa do body inválido
    if (statusCode == 400 && error?.message && !cause)
        cause = error.message;


    log.red("Erro " + statusCode + ": " + message + "");
    if (descricao) log.yellow(descricao);

    if (error) log.red(error.stack);

    // modelError.createError(escape(message), escape(descricao), escape(statusCode), error ? escape(error.stack) : false);
    return res.status(statusCode).json({ message, cause, multistatus });
};

export const sqlErrorHandler = (error, acao) => {
    if(error.sqlMessage){
        throw new Error(JSON.stringify({
            code: 500,
            message: `Erro ao ${acao}`,
            descricao: `ERRO. de sql ao ${acao}`
        }));
    };
    return
};

export default errorHandler;