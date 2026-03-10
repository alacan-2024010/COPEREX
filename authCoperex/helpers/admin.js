import{Admin}from "../src/auth/auth.model.js";
import { encryptPassword } from "./encrypt-password.js";

export const createDefaultAdmins = async () => {

    const admin1 = await Admin.findOne({
        where: { email: "admin@coperex.com" }
    });

    if (!admin1) {

        const password = await encryptPassword("Admin12345");

        await Admin.create({
            username: "Administrador Principal",
            email: "admin@coperex.com",
            password,
            role: "ADMIN",
            isActive: true
        });

        console.log("Admin principal creado");
    }

    const admin2 = await Admin.findOne({
        where: { email: "admin2@coperex.com" }
    });

    if (!admin2) {

        const password = await encryptPassword("Admin2024010");

        await Admin.create({
            username: "Administrador Secundario",
            email: "admin2@coperex.com",
            password,
            role: "ADMIN",
            isActive: true
        });

        console.log("Admin secundario creado");
    }

};
