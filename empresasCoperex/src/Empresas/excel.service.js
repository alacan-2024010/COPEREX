import ExcelJS from 'exceljs';
import { Empresa } from './empresas.model.js';

export const generarReporteExcel = async () => {
    const empresas = await Empresa.find({ isActive: true });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Empresas');

    sheet.columns = [
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Nivel de Impacto', key: 'nivelImpacto', width: 20 },
        { header: 'Años de Trayectoria', key: 'anosTrayectoria', width: 20 },
        { header: 'Categoría', key: 'categoria', width: 20 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Teléfono', key: 'telefono', width: 20 },
        { header: 'Ciudad', key: 'ciudad', width: 20 },
        { header: 'País', key: 'pais', width: 20 },
        { header: 'Registrado por', key: 'user', width: 24 },
        { header: 'Fecha de Registro', key: 'fechaRegistro', width: 24 },
    ];

    empresas.forEach(e => {
        sheet.addRow({
            nombre: e.nombre,
            nivelImpacto: e.nivelImpacto,
            anosTrayectoria: e.anosTrayectoria,
            categoria: e.categoria,
            email: e.contacto?.email || '',
            telefono: e.contacto?.telefono || '',
            ciudad: e.direccion?.ciudad || '',
            pais: e.direccion?.pais || '',
            user: e.user,
            fechaRegistro: e.fechaRegistro.toISOString().split('T')[0],
        });
    });

    return workbook;
};