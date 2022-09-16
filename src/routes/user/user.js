// Dependências
import { Router } from "express";


// Services
import errorHandler from "../../services/error-handler.js";

//Middleware
import * as multer from "../../middlewares/file/file-handler.js";
import { tokenAuthValidator, tokenFormValidator } from "../../middlewares/auth/auth.js";


//controler
import * as candidatoControllers from "../../controllers/user/users.js";

const router = Router();

//GET
router.get('/user', tokenAuthValidator, tokenFormValidator, async (req, res, next) => {
    try{
        const userInfo = await candidatoControllers.getUserInfo(req.user.id, req.idForm);
        res.status(200).json(userInfo);

    } catch (error) {
        errorHandler(res, error, req.user.id, 500, "Erro ao retornar informações do usuario");
    }
})

//POST
router.post('/user', tokenAuthValidator, multer.uploadStorage.single("file"), async (req, res, next) => {
    try {
        req.body = JSON.parse(req.body.usuario);

        const result = await candidatoControllers.saveUser(req.body, req.file.filename); 
        res.status(201).json(result);

    } catch (error) {
        errorHandler(res, error, req.user.id, 500, "Erro ao salvar usuario");
    }
})


export default router;