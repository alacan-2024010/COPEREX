'use strict';

import{Schema,mongoose} from 'mongoose';

const empresaSchema  =mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre de la empresa es obligatorio"],
            trim: true,
            unique: true
        },
        nivelImpacto: {
            type: String,
            enum: ["Alto", "Medio", "Bajo"],
            required: [true, "El nivel de impacto es obligatorio"]
        },
        anosTrayectoria: {
            type: Number,
            required: [true, "Los años de trayectoria son obligatorios"],
            min: [0, "Debe ser un número positivo"]
        },
        categoria: {
            type: String,
            required: [true, "La categoría es obligatoria"],
            trim: true
        },
        descripcion: {
            type: String,
            trim: true
        },
        contacto: {
            email: { 
                type: String, 
                trim: true 
            },
            telefono: { 
                type: String, 
                trim: true 
            }
        },
        direccion: {
        ciudad: { 
            type: String, 
            trim: true 
        },
        pais: { 
            type: String, 
            trim: true 
        }
        },
        fechaRegistro: {
            type: Date,
            default: Date.now
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export const Empresa = mongoose.model("Empresa", empresaSchema);