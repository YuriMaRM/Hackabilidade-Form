// Dependencias
import * as conn from "../../conn.js";

export const getAllQuestions = async () => {
    return await conn.sql(`
        SELECT 
            quest.id, 
            quest.pergunta, 
            quest.termo 
        FROM tb_disc_questao quest
    `);
};

export const getIdResult = async (averageResult) => {
    return await conn.sqlSelectValue(`
        SELECT 
            model_list.id_modelo
        FROM tb_disc_modelo_lista model_list
            JOIN (
                SELECT
                    d.d,i.i,s.s,c.c
                FROM
                    (SELECT peso AS d 
                        FROM tb_disc_resultado 
                        WHERE dimension='D' 
                            AND valor = ${averageResult.d} ) d,
                    (SELECT peso AS i 
                        FROM tb_disc_resultado 
                        WHERE dimension='I' 
                            AND valor = ${averageResult.i}) i,
                    (SELECT peso AS s 
                        FROM tb_disc_resultado 
                        WHERE dimension='S' 
                            AND valor = ${averageResult.s}) s,
                    (SELECT peso AS c 
                        FROM tb_disc_resultado 
                        WHERE dimension='C' 
                            AND valor = ${averageResult.c}) c
            ) disc_result ON (
                model_list.d = disc_result.d 
                    AND model_list.i= disc_result.i 
                        AND model_list.s= disc_result.s 
                            AND model_list.c= disc_result.c)
    `);
};

export const getResultById = async (idResult) => {
    return conn.sqlSelectRow(`
        SELECT * FROM tb_disc_modelo WHERE id = ${idResult}
    `);
}

export const getAvaregeResult = async () => {
    return conn.sqlSelectRow(`
        SELECT 
            SUM(IF( r.valor = 'D', 1, 0)) d,
            SUM(IF( r.valor = 'I', 1, 0)) i,
            SUM(IF( r.valor = 'S', 1, 0)) s,
            SUM(IF( r.valor = 'C', 1, 0)) c
        FROM tb_disc_questao r 
        WHERE id IN 
            (SELECT MAX(id) FROM tb_disc_questao GROUP BY pergunta);
    `);   
}