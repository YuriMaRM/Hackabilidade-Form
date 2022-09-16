// Helpers
import { value, valueWhithOnlyValued, onlyValued }  from '../../helpers/escape.js';

// Models
import * as formModels from '../../models/form/forms.js';

// Services
import { sqlErrorHandler } from '../../services/error-handler.js';


export const getForm = async (idForm) => {
    const result = await formModels.getForm(value(idForm));
    sqlErrorHandler(result, 'pegar formulario');

    return "uploads/" + result;
}

export const getFormReply = async (idFormReply) => {
    const result = await formModels.getFormReply(value(idFormReply));
    sqlErrorHandler(result, 'pegar formulario respondido');

    return "uploads/" + result;
}

export const saveForm = async (file, userId) => {
    const result = await formModels.createForm(value(file.filename), value(userId));
    sqlErrorHandler(result, 'salvar formulario');
    return result;
}

export const saveReplyForm = async (file, userId, formId) => {
    const result = await formModels.createReplyForm(value(file.filename), value(userId), value(formId));
    sqlErrorHandler(result, 'salvar formulario respondido');
    return;
}