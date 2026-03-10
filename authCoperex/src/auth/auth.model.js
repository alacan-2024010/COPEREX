import { DataTypes } from "sequelize";
import { sequelize } from "../../configs/db.js";

export const Admin = sequelize.define(
    "Admin",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El nombre es obligatorio"
                },
                notEmpty: {
                    msg: "El nombre no puede estar vacío"
                }
            }
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                msg: "El correo ya está registrado"
            },
            validate: {
                notNull: {
                    msg: "El correo es obligatorio"
                },
                isEmail: {
                    msg: "Debe ingresar un correo válido"
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "La contraseña es obligatoria"
                },
                len: {
                    args: [8, 100],
                    msg: "La contraseña debe tener mínimo 8 caracteres"
                }
            }
        },

        role: {
            type: DataTypes.STRING,
            defaultValue: "ADMIN"
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: "admins",
        timestamps: true
    }
);