import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error('Error: JWT_SECRET no está definido');
        return res.status(500).json({
            success: false,
            message: 'Configuración del servidor inválida: falta JWT_SECRET'
        });
    }

    const token =
        req.header('x-token') ||
        req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No se proporcionó un token'
        });
    }

    try {

        const decoded = jwt.verify(token, secret);

        req.user = {
            id: decoded.uid
        };

        next();

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'El token ha expirado'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error al validar el token'
        });
    }
};