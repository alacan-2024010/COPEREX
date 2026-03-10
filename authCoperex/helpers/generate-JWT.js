import jwt from "jsonwebtoken";

export const generateJWT = (uid) => {
    return jwt.sign(
        { uid },
        process.env.JWT_SECRET
    )
}