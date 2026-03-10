# PMA: Empresa COPEREX

Este proyecto está compuesto por dos APIs independientes: 

**API de Autenticación**

**API Gestor de Empresas**


# AuthCoperex
Primero se ubica en la carpeta de autenticación:

Con el siguiente comando:

cd authCoperex

    C:\COPEREX\authCoperex

La configuración para el .env es la siguiente:

    NODE_ENV=development
    PORT=3006

    DB_HOST=localhost
    DB_PORT=5436
    DB_NAME=GestorCoperex
    DB_USERNAME=root
    DB_PASSWORD=admin
    DB_SQL_LOGGING=false

    JWT_SECRET=MySecretKeyForJWTTokenAuthenticationWith256Bits!
    JWT_ISSUER=AuthService
    JWT_AUDIENCE=AuthService

**Esta API trabaja con PostgreSQL utilizando Docker**

Pasos para ejecutar la API

1. Abrir Docker Desktop

2. Instalar dependencias: pnpm install

3. Levantar el contenedor de Docker: docker compose up -d

4. Verificar que el contenedor esté activo en Docker Desktop

5. Configurar en PgAdmin el servidor para crear la base de datos

6. Iniciar la API: pnpm run dev

Los endpoints a probar en Postman se encuentran en la carpeta llamada `Postman`. Para importarlos, abra Postman y seleccione **File → Import → Seleccionar archivo o carpeta**, luego elija la carpeta o archivo correspondiente para tener todos los endpoints listos para probar.


# EmpresasCoperex

Esta API permite crear, editar y visualizar de forma ascendente, descendente, por impacto, entre otras. Esto solo lo Puede realizar el Administrador que se logueo en la Autenticación.

Primero se ubica en la carpeta de EmpresasCoperex:

Con el siguiente comando:

cd empresasCoperex

    C:\COPEREX\empresasCoperex

La configuración para el .env es la siguiente:

    NODE_ENV=development
    PORT=3005

    URI_MONGO=mongodb://localhost:27017/GestorCoperexEmpresas

    JWT_SECRET=MySecretKeyForJWTTokenAuthenticationWith256Bits!
    JWT_ISSUER=AuthService
    JWT_AUDIENCE=AuthService**

**Esta API trabaja con MongoDB**

Pasos para ejecutar la API

1. Instalar dependencias: pnpm install

2. Verificar que MongoDB esté ejecutándose

3. Iniciar el proyecto: pnpm run dev

Los endpoints a probar en Postman se encuentran en la carpeta llamada `Postman`. Para importarlos, abra Postman y seleccione **File → Import → Seleccionar archivo o carpeta**, luego elija la carpeta o archivo correspondiente para tener todos los endpoints listos para probar.

**Uso del token**

1. Ir a la pestaña Authorization

2. En el campo Type, seleccionar Bearer Token

3. En el campo Token, pegar el token generado después de verificar la cuenta

Si el token no es válido o ha expirado, la API dara error


**Exportar Empresas a Excel**
Esta funcionalidad permite generar un reporte en formato Excel con todas las empresas registradas. Solo puede ser realizada por un Administrador autenticado.

**Endpoint:**
GET http://localhost:3005/gestorEmpresas/v1/empresas/exportar/excel

1. Se tiene que agregar el token de Administrador

2. A la par de Send hay una flecha para abajo en la cual hay que elegir la opcion **Send and Download**, luego te debes descargar el archivo y ponerle este nombre: **empresas.xlsx**, por ultimo lo debes abrir desde excel.
