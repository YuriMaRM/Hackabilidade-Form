// Dependencias
import * as conn from "../../conn.js";


export const getForm = async (idForm) => {
    return conn.sqlSelectValue(`
        SELECT
            form.caminho
        FROM tb_formulario form 
        WHERE form.id = ${idForm}
    `);
}

export const getFormReply = async (idFormReply) => {
    return conn.sqlSelectValue(`
        SELECT
            form.caminho
        FROM tb_formulario_resposta form
        WHERE form.id = ${idFormReply}
    `);
}

export const createForm = async (fileName, idUser)=> {
    const result = await conn.sqlInsert(`
        INSERT INTO tb_formulario (id_empresa, caminho)
        VALUES (${idUser}, ${fileName})
    `); 
    return result;
}

export const createReplyForm = async (fileName, idUser, idForm) => {
    const result = await conn.sqlInsert(`
        INSERT INTO tb_formulario_resposta (caminho, id_candidato, id_formulario)
        VALUES(${fileName}, ${idUser}, ${idForm})
    `);
    return result;
}