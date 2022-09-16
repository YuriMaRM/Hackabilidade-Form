//Dependências
import multer from "multer";

//Helpers
import log from "../../helpers/log.js";
import { randomString } from "../../helpers/codeGenerator.js";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${file.originalname.toLowerCase().split(" ").join("-").split("/").join("-")}`)
    },
  })

const fileFilter = (req, file, cb) => {
    if (["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.mimetype)) {
        cb(null, true);
        log.blue(`${file.originalname} foi armazenado no servidor!`);
    } else {
        cb(null, false);
        log.yellow(`O usuário tentou enviar um arquivo não suportado. Formato: ${file.mimetype}`);
        req.hasUnsuportedFiles = true;
    };
};
export const uploadStorage = multer({ storage: storage, fileFilter: fileFilter });
