// Dependências
import mysql from "mysql";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Helpers
import log from "./helpers/log.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/../.env` });


// Se conecta com o BD
const conn = mysql.createPool({
    connectionLimit: 10000,
    host: process.env.IP_HOST,
    user: process.env.USER_BD,
    password: process.env.SENHA_BD,
    database: process.env.NOME_BD
});

 conn.getConnection((err, connection) => {
    if (err)
        log.red(err);
    else
        log.green("Conectado ao Banco de Dados com sucesso!");
    return;
}); 

// Retorna true ou false
export const exists = query => {
    return new Promise(resolve => {
        conn.getConnection((err, connection) => {
            if(err)
                connection.release();
            connection.query(`${query}`, (error, results, fields) => {
                connection.release();
                if (error)
                    console.log(error);
                resolve(error || results[0]?.code ? true : false, fields);
            });
        });
    });
};

// Retorna, se existirem, os dados e false se não existirem
export const check = query => {
    return new Promise(resolve => {
        conn.getConnection((err, connection) => {
            if(err)
                console.log(err);
            connection.query(`${query}`, (error, results, fields) => {
                connection.release()
                if (error)
                    console.log(error);
                resolve(error || results[0] ? results[0] : false, fields);
            });

        });
    });
};

// Para usar sql sem restrição
export const sql = (query) => {
    return new Promise(resolve => {
        conn.getConnection((err, connection) => {
            if(err)
                console.log(err);
            connection.query(`${query}`, (error, results, fields) => {
                connection.release();
                if (error)
                    console.log(error);
                resolve(error || results, fields);
            });
        });
    });
};
// Retorna apenas o primeiro valor da primeira linha
export const sqlSelectValue = (query) => {
    return new Promise(resolve => {
        conn.getConnection((err, connection) => {
            if(err)
                console.log(err);
            connection.query(`${query}`, (error, results, fields) => {
                connection.release();
                if (error)
                    console.log(error);
                resolve(error || Object.values(results[0])[0], fields);
            });
        });
    });
};

// Retorna a primeira linha
export const sqlSelectRow = (query) => {
    return new Promise(resolve => {
        conn.getConnection((err, connection) => {
            if(err)
                console.log(err);            
            connection.query(`${query}`, (error, results, fields) => {
                if (error)
                    console.log(error);
                connection.release();
                resolve(error || results[0], fields);
            });
        });
    });
};

// Retorna um array da primeira coluna
export const sqlArray = (query) => {
    return new Promise(resolve => {
        conn.getConnection((err, connection) => {
            if(err)
                console.log(err);            
            connection.query(`${query}`, (error, results, fields) => {
                if (error)
                    console.log(error);
                connection.release();
                resolve(error || results.map(result => result.code), fields);
            });
        });
    });
};

export const sqlInsert = (query) => {
    return new Promise(resolve => {
        conn.getConnection((err, connection) => {
            if(err)
                console.log(err);
            connection.query(`${query}`, (error, results, fields) => {
                if (error)
                    console.log(error);
                connection.release();
                resolve(error || results.insertId, fields);
            });
        });
    });
};
