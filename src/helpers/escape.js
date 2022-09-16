// Dependências
import { escape, escapeId } from "mysql";

// Escape padrão, verifica se é objeto. Se for, da escape em cada valor do objeto
export const value = valor => {
    if (typeof valor === "object") {
        for (const key in valor) {
            if (typeof valor[key] == 'object' && valor[key] !== null)
                value(valor[key]);
            else
            valor[key] = escape(valor[key]);
        };

        return valor;
    };

    return escape(valor);
};

// Apaga chaves vazias que estão dentro de outras chavez
export const valueWhithOnlyValued = valor => {
    if (typeof valor === "object") {
        for (const key in valor) {
            if (typeof valor[key] == 'object' && valor[key] !== null)
                onlyValued(valor[key]);
            else
                valor[key] = escape(valor[key]);
        };

        return valor;
    };

    return escape(valor);
};

// Apaga chaves vazias
export const onlyValued = valor => {
    if (typeof valor === "object") {
        for (const key in valor) {
            if (typeof valor[key] == 'object' && valor[key] !== null){
                onlyValued(valor[key]);
                if(valor[key].length === 0)
                    delete valor[key]; 
            } else if(valor[key] || valor[key] === false || valor[key] === 0)
                valor[key] = escape(valor[key]);
            else
                delete valor[key]; 
        };
        return valor;
    };
    if(valor || valor === false)
        return escape(valor);
    else
        return;
};


export const id = value =>
    escapeId(value);

export default value;
