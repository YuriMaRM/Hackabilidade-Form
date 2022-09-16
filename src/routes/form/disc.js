// Dependências
import { Router } from "express";


// Services
import errorHandler from "../../services/error-handler.js";


//Middleware
import { tokenAuthValidator } from "../../middlewares/auth/auth.js";


// Controllers
import * as discControllers from "../../controllers/form/disc.js"; 
import * as candidatoControllers from "../../controllers/user/users.js";


const router = Router();

//GET
router.get('/disc',tokenAuthValidator, async (req, res, next) => {
    try {
        const result = await discControllers.getQuestion();
        res.status(200).json(result);
    } catch (error) {
        errorHandler(res, error, req.user.id, 500, "Erro ao retornar listagem do formulario DISC");
    };    
});   

router.get('/disc/resultado/:id',tokenAuthValidator, async (req, res, next) => {
    try {
        const result = await discControllers.getResultById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        errorHandler(res, error, req.user.id, 500, "Erro ao retornar listagem do formulario DISC");
    };    
});   


//POST
router.post('/disc', tokenAuthValidator, async (req, res, next) => {
    try {
        const result = await discControllers.getResult(req.body);
        await candidatoControllers.saveResult(req.user.id, result.id); 
        res.status(201).json(result);
    } catch (error) {
        errorHandler(res, error, req.user.id, 500, "Erro ao salvar resultado DISC");
    }
})

export default router;