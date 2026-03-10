'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';

const BASE_PATH = '/api/v1';

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;

    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));

    try {
        await dbConnection()

        // Health check (opcional pero recomendado)
        app.get(`${BASE_PATH}/health`, (req, res) => {
            res.status(200).json({
                status: 'OK',
                service: 'COPEREX Auth',
                timestamp: new Date()
            })
        })

        app.listen(PORT, () => {
            console.log(`COPEREX Auth Server running on port ${PORT}`)
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`)
        })

    } catch (err) {
        console.error(`Error starting server: ${err.message}`)
        process.exit(1)
    }

};