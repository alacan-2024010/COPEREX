import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOptions } from './cors-configuration.js';
import EmpresaRoutes from '../src/Empresas/empresas.routes.js';

const BASE_PATH = '/gestorEmpresas/v1';

const middlewares = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
}

const routes = (app) => {

    app.use(`${BASE_PATH}/empresas`, EmpresaRoutes);


    app.get(`${BASE_PATH}/health`, (request, response) => {
        response.status(200).json({
            status: 'Healthy',
            timestamp: new Date().toISOString(),
            service: 'GestorDeEmpresas Server'
        })
    })

    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Endpoint no encontrado en la API'
        })
    })
}


export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trust proxy', 1);

    try {
        await dbConnection();
        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`GestorDeEmpresas Server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`);
        });

    } catch (error) {
        console.error(`Error starting Admin Server: ${error.message}`);
        process.exit(1);
    }
}