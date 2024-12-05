# Microservicio de Integración

Este microservicio permite la integración de un sistema de fidelización de clientes con otros sistemas de la empresa, como CRM o ERP. Está construido usando Node.js y Express, y proporciona una API RESTful.

## Requisitos

- Node.js >= 14.x
- PostgreSQL
- Un servicio de correo electrónico (por ejemplo, Gmail)

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <DIRECTORIO_DEL_REPOSITORIO>
Instalar dependencias:

Asegúrate de tener Node.js instalado y luego ejecuta el siguiente comando para instalar las dependencias del proyecto:

bash
Copiar código
npm install
Esto instalará todas las dependencias necesarias, que son:

body-parser: Middleware para analizar cuerpos de solicitudes.
cors: Middleware para habilitar CORS.
dotenv: Para cargar variables de entorno desde un archivo .env.
express: Framework para construir la API.
jsonwebtoken: Para manejar autenticación basada en JWT.
nodemailer: Para el envío de correos electrónicos.
nodemon: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.
pg: Cliente para interactuar con bases de datos PostgreSQL.
pg-hstore: Dependencia para trabajar con tipos de datos hstore en PostgreSQL.
sequelize: ORM para interactuar con la base de datos PostgreSQL.


Configuración de variables de entorno:

En la raíz del proyecto, crea un archivo .env con las siguientes variables de entorno:

makefile
Copiar código
DB_HOST="<host de la base de datos>"
DB_PORT="5432"
DB_NAME="<nombre de la base de datos>"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_DIALECT="postgres"
MAIL_SERVICE="Gmail"
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=465
MAIL_USER="*********"  # Tu usuario de Gmail
MAIL_PASS="*********"  # Tu contraseña o token de aplicación de Gmail
JWT_SECRET="mysecretkey"  # Clave secreta para la firma de los tokens JWT
Asegúrate de reemplazar <host de la base de datos> y <nombre de la base de datos> con los valores correctos, y de utilizar tus credenciales de correo para las variables de MAIL_USER y MAIL_PASS.


Scripts
Iniciar el servidor:

Para iniciar el servidor en producción, ejecuta:

bash

npm start
Desarrollo:

Para iniciar el servidor en modo desarrollo con nodemon (para reiniciar automáticamente el servidor al realizar cambios), ejecuta:

bash

npm run dev
Generar datos de prueba:

Si necesitas una colección de postman utilizar la colección adjunta al repositorio

