import{Empresa}from './empresas.model.js'

export const createEmpresa = async (req, res) => {
    try {
        const { nombre, nivelImpacto, anosTrayectoria, categoria } = req.body;

        // Validación de campos 
        if (!nombre || !nivelImpacto || !anosTrayectoria || !categoria) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios",
            });
        }

        const empresaData = {
            nombre,
            nivelImpacto,
            anosTrayectoria,
            categoria,
            user: req.user.id, //el admin que creo la empresa
        };

        const empresa = new Empresa(empresaData);
        await empresa.save();

        res.status(201).json({
            success: true,
            message: "Empresa creada exitosamente",
            data: empresa,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la empresa",
            error: error.message,
        });
    }
};

// Listar empresas
export const getEmpresas = async (req, res) => {
    try {
        const { page = 1, limit = 15, categoria, nivelImpacto } = req.query;

        const filter = {};
        if (categoria) filter.categoria = categoria;
        if (nivelImpacto) filter.nivelImpacto = nivelImpacto;

        const empresas = await Empresa.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Empresa.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: empresas,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: error.message,
        });
    }
};

// Obtener empresa por id
export const getEmpresaById = async (req, res) => {
    try {
        const { id } = req.params;

        const empresa = await Empresa.findById(id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: "Empresa no encontrada",
            });
        }

        res.status(200).json({
            success: true,
            message: "Empresa encontrada",
            data: empresa,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al buscar la empresa",
            error: error.message,
        });
    }
};

// Actualizar empresa
export const updateEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const empresa = await Empresa.findById(id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: "Empresa no encontrada"
            });
        }

        // Solo admin que creó la empresa puede actualizar
        if (empresa.user !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "No puedes modificar esta empresa"
            });
        }

        const updateData = { ...req.body };

        const updatedEmpresa = await Empresa.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: "Empresa actualizada correctamente",
            data: updatedEmpresa
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la empresa",
            error: error.message
        });
    }
};
