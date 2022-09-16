// Helpers
import { value, valueWhithOnlyValued, onlyValued }  from '../../helpers/escape.js';
//import objectEmpty from '../../helpers/isEmpty.js';

// Models
import * as discModels from '../../models/form/disc.js';

// Services
import { sqlErrorHandler } from '../../services/error-handler.js';


export const getQuestion = async () => {

    const questions = await discModels.getAllQuestions();
    sqlErrorHandler(questions, 'retornar todas as perguntas');

/*     const questionFormated = await questions.map(question => ({
        id: question.id,
        termo: question.termo,
        pergunta: question.pergunta
    }))  */
    let questionFormated = [];
    for (let i = 0; i < 14; i++) {
        let questList = []
        for (let j = 0; j < 4; j++) {
            questList.push(questions[i * 4 + j]);
        }   
        questionFormated.push(questList);     
    }
    return questionFormated;
}

export const getResult = async (questionList) => {
    const averageResult = await discModels.getAvaregeResult(value(questionList));
    sqlErrorHandler(averageResult, 'retornar a media dos resultados');
    const idResult = await discModels.getIdResult(value(averageResult));
    sqlErrorHandler(idResult, 'retornar o id do resultado');
    const result = await discModels.getResultById(value(idResult));
    sqlErrorHandler(result, 'retornar o resultado pelo Id');

    return result;
};

export const getResultById = async (idResult) => {
    const result = await discModels.getResultById(value(idResult));
    sqlErrorHandler(result, 'retornar o resultado pelo Id');
    return result;
}

