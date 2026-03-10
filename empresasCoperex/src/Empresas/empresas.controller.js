import{Empresa}from './empresas.model.js';
import{generarReporteExcel} from './excel.service.js';

export const createEmpresa = async (req, res) => {
    try {
        const { nombre, nivelImpacto, anosTrayectoria, categoria, descripcion, contacto, direccion } = req.body;

        // Validación de campos 
        if (!nombre || !nivelImpacto || !anosTrayectoria || !categoria || !contacto || !direccion) {
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
            descripcion,
            contacto,
            direccion,
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
        const { 
            page = 1, 
            limit = 15, 
            categoria, 
            nivelImpacto,
            anosTrayectoriaMin,
            anosTrayectoriaMax,
            orden //el orden que llevara para listar las empresas
        } = req.query;

        const filter = { isActive: true }; //empresas activas
        if (categoria) filter.categoria = categoria;
        if (nivelImpacto) filter.nivelImpacto = nivelImpacto;
        if (anosTrayectoriaMin || anosTrayectoriaMax) {
            filter.anosTrayectoria = {};
            if (anosTrayectoriaMin) filter.anosTrayectoria.$gte = parseInt(anosTrayectoriaMin);
            if (anosTrayectoriaMax) filter.anosTrayectoria.$lte = parseInt(anosTrayectoriaMax);
        }

        // Construir orden dinámico
        let sort = {};
        switch (orden) {
            //el 1 hace que se ordene de arriba hacia abajo 
            // el -1 hace que se ordene de abajo hacia arriba
            case 'nombre_asc':
                sort = { nombre: 1 };
                break;
            case 'nombre_desc':
                sort = { nombre: -1 };
                break;
            case 'nivelImpacto_asc':
                sort = {nivelImpacto: 1};
                break;
            case 'nivelImpacto_desc':
                sort = {nivelImpacto: -1};
                break;
            case 'anosTrayectoria_asc':
                sort = { anosTrayectoria: 1 };
                break;
            case 'anosTrayectoria_desc':
                sort = { anosTrayectoria: -1 };
                break;
            default:
                sort = { createdAt: -1 }; // por defecto fecha de registro descendente
        }

        const empresas = await Empresa.find(filter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort(sort);

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
}

//Para exportar el excel
export const exportEmpresasExcel = async (req, res) => {
    try {
        const workbook = await generarReporteExcel();

        // Headers para que el navegador/cliente descargue el archivo
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=empresas.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generando el reporte Excel',
            error: error.message,
        });
    }
};
