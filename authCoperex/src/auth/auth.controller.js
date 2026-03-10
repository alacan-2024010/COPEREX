import{Admin} from "./auth.model.js";
import{comparePassword} from "../../helpers/hash-password.js";
import{generateJWT} from "../../helpers/generate-JWT.js";

export const login = async (req, res) => {
    try {
        const{email,password} = req.body;

        const admin = await Admin.findOne({
        where: { email }
        });

        if (!admin) {
        return res.status(400).json({
            message: "Las Credenciales que ingresaste son incorrectas"
            })
        }

        if (!admin.isActive) {
        return res.status(400).json({
            message: "El usuario está inactivo"
            })
        }

        const validPassword = await comparePassword(password, admin.password);

        if (!validPassword) {
        return res.status(400).json({
            message: "Las Credenciales que ingresaste son incorrectas"
            })
        }

        const token = await generateJWT(admin.id);

        res.status(200).json({
            admin,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
            error: error.message
        });
        
    }
}