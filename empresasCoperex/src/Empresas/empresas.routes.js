import{Router}from 'express';
import {getEmpresaById,createEmpresa,getEmpresas,deleteEmpresa,updateEmpresa} from './empresas.controller.js';
import { validateJWT} from '../../middlewares/validate-JWT.js';

const router = Router();

router.post(
    '/crear',
    validateJWT,
    createEmpresa
)

router.get(
    '/listar',
    validateJWT,
    getEmpresas
)

router.get(
    '/listar/:id',
    validateJWT,
    getEmpresaById
)

router.put(
    '/actualizar/:id',
    validateJWT,
    updateEmpresa
)

router.delete(
    '/eliminar/:id',
    validateJWT,
    deleteEmpresa
)

export default router;