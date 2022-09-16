// Dependências
import { Router } from "express";
import * as fs from "fs";

//Controller
import * as formControllers from "../../controllers/form/forms.js";

//Middleware
import * as multer from "../../middlewares/file/file-handler.js";
import { tokenAuthValidator, tokenFormValidator } from "../../middlewares/auth/auth.js";

// Services
import errorHandler from "../../services/error-handler.js";

//Helper
import { createToken } from "../../helpers/codeGenerator.js";

const router = Router();

//GET
router.get('/formulario/:id', tokenAuthValidator, async (req, res, next) => {
    try {
        const idForm = req.params.id;
        const path = await formControllers.getForm(idForm);
        var file = fs.createReadStream(path);
        var stat = fs.statSync(path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=form.pdf');
        file.pipe(res);
    } catch (error) {
        errorHandler(res, error, req.user.id, 500, "Erro ao retornar formulario");
    };    
});   

router.get('/formulario', tokenAuthValidator, tokenFormValidator, async (req, res, next) => {
    try {
        const idForm = req.idForm;
        const path = await formControllers.getForm(idForm);
        var file = fs.createReadStream(path);
        var stat = fs.statSync(path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=form.pdf');
        file.pipe(res);
    } catch (error) {
        errorHandler(res, error, req.user.id, 500, "Erro ao retornar formulario");
    };    
});   

/* router.get('/formulario/:id/respostas', async (req, res, next) => {
    try {
        const path = await formControllers.getReplys(req.params.id);
        
    } catch (error) {
        errorHandler(res, error, req.idUsuario, 500, "Erro ao retornar listagem dos formularios");
    };    
});   */

router.get('/formulario/resposta/:id', async (req, res, next) => {
    try {
        const path = await formControllers.getFormReply(req.params.id);
        var file = fs.createReadStream(path);
        var stat = fs.statSync(path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=form.pdf');
        file.pipe(res);
    } catch (error) {
        errorHandler(res, error, req.idUsuario, 500, "Erro ao retornar formulario respondido");
    };    
});   

//POST

router.post('/formulario/novo', tokenAuthValidator, multer.uploadStorage.single("file"), async (req, res, next) => {
    try {
        const idForm = await formControllers.saveForm(req.file, req.user.id);
        const jwt = await createToken({formulario: idForm});
        res.status(201).json(jwt);
    } catch (error) {
        errorHandler(res, error, req.user.id, 500, "Erro ao criar novo formulario");
    }
})

router.post('/formulario/:idForm/resposta',tokenAuthValidator, multer.uploadStorage.single("file"), async (req, res, next) => {
    try {
        await formControllers.saveReplyForm(req.file, req.user.id, req.params.idForm);

        res.status(201).json(req.file);
    } catch (error) {
        errorHandler(res, error,  req.user.id, 500, "Erro ao criar novo formulario");
    }
})

export default router;