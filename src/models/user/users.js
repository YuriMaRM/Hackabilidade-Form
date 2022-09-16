// Dependencias
import * as conn from "../../conn.js";

export const saveResult = async (idUser, idResult) => {
    return await conn.sql(`
        UPDATE tb_candidato 
            SET id_disc_modelo = ${idResult}
        WHERE id = ${idUser}
    `);
};


export const getUserPath = async (idUser) => {
    return await conn.sqlSelectValue(`
        SELEC caimnho FROM tb_candidato WHERE id_disc_modelo = ${idUser}
    `);
}

export const saveInfo = async (info, path) => {
    return await conn.sqlInsert(`
        INSERT INTO tb_candidato (nome, cpf, data_nascimento, email, telefone, referencia, caminho)
        VALUES(${info.nome}, ${info.cpf}, ${info.dataNascimento}, ${info.email}, ${info.telefone}, ${info.referencia}, ${path || `NULL`})
    `);
};

export const getUserInfo = async (idUser, idForm) => {
    return await conn.sqlSelectRow(`
        SELECT 
            tb_candidato.id,
            tb_candidato.nome, 
            tb_candidato.cpf, 
            tb_candidato.data_nascimento, 
            tb_candidato.email, 
            tb_candidato.telefone, 
            tb_candidato.referencia,
            ${idForm ? `IFNULL(tb_formulario_resposta.id, FALSE) fomulario_completo,`: ``} 
            tb_candidato.id_disc_modelo
        FROM tb_candidato 
        ${idForm ? `LEFT JOIN tb_formulario_resposta 
            ON tb_formulario_resposta.id_candidato = tb_candidato.id 
                AND  tb_formulario_resposta.id_formulario = ${idForm}` : ``}
        WHERE tb_candidato.id = ${idUser}
    `);
};