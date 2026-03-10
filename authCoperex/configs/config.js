import dotenv from 'dotenv';

dotenv.config();

export const config = {
    
    // JWT Configuration
    jwt: {
        secret: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
    },

    // Password Security
    security: {
        saltRounds: 12
    },

    // CORS Configuration
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
            : []
    }

};