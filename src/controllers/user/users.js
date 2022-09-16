// Helpers
import { value, valueWhithOnlyValued, onlyValued }  from '../../helpers/escape.js';
//import objectEmpty from '../../helpers/isEmpty.js';

// Models
import * as userModels from '../../models/user/users.js';

// Services
import { sqlErrorHandler } from '../../services/error-handler.js';


export const saveResult = async (idUser, idResult) => {

    const result = await userModels.saveResult(value(idUser), value(idResult));
    sqlErrorHandler(result, 'salvar resultado no candidato');

    return;
}


export const saveUser = async (infos, path) => {

    const result = await userModels.saveInfo(value(infos), value(path));
    sqlErrorHandler(result, 'salvar usuario');

    return result;
}

export const getUserPath = async (idUser) => {
    const result = await userModels.getUserPath(value(idUser));
    sqlErrorHandler(result, 'pegar informações do usuario');

    return result;
}

export const getUserInfo = async (idUser, idForm) => {
    const result = await userModels.getUserInfo(value(idUser), onlyValued(idForm));
    sqlErrorHandler(result, 'pegar informações do usuario');

    return result;
}