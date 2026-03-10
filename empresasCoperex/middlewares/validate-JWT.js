import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {

    const jwtConfig ={
        secret: process.env.JWT_SECRET, 
        issuer: process.env.JWT_ISSUER, 
        audience: process.env.JWT_AUDIENCE
    }

    if (!jwtConfig.secret){
        console.error('Error de validación: JWT_SECRET no está definido');
        return res.status(500).json({
            success: false,
            message: 'Configuarión del servidor inválida: falta JWT_SECRET'
        })
    }

    const token = 
        req.header('x-token') ||
        req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No se proporcionó un token',
            error: 'MISSING_TOKEN'
        })
    }

    try {

        const decoded = jwt.verify(token, jwtConfig.secret);

        req.user = {
            id: decoded.uid //uid porque asi se genera en el AuthService
        };
        
        next();

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'El token ha expirado'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error al validar el token'
        });
    }
};