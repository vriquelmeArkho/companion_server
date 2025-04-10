# Uppy Companion Server

Este es un servidor Uppy Companion configurado para desplegarse directamente desde BitBucket a AWS App Runner.

## Configuración

### Variables de entorno en BitBucket

Configura las siguientes variables de entorno en tu repositorio de BitBucket:

**Requeridas para el funcionamiento de Uppy Companion:**
- `COMPANION_SECRET`: Clave secreta para las sesiones y tokens
- `COMPANION_PROTOCOL`: Protocolo del servidor (https)
- `COMPANION_DOMAIN`: Dominio de AWS App Runner donde se desplegará
- `COMPANION_CLIENT_ORIGINS`: Orígenes permitidos para CORS (por ejemplo: * o https://tu-sitio.com)
- `COMPANION_DROPBOX_KEY`: Client ID de Dropbox
- `COMPANION_DROPBOX_SECRET`: Client Secret de Dropbox
- `COMPANION_GOOGLE_KEY`: Client ID de Google Drive
- `COMPANION_GOOGLE_SECRET`: Client Secret de Google Drive
- `COMPANION_ONEDRIVE_KEY`: Client ID de OneDrive
- `COMPANION_ONEDRIVE_SECRET`: Client Secret de OneDrive

**Requeridas para el despliegue en AWS:**
- `AWS_ACCESS_KEY_ID`: ID de clave de acceso AWS
- `AWS_SECRET_ACCESS_KEY`: Clave secreta de AWS
- `AWS_REGION`: Región de AWS (por ejemplo: us-east-1)

### Cómo funciona el CI/CD

En este proyecto, las variables de entorno se configuran en tres lugares:

1. **BitBucket Repository Variables**: Configuras todas las variables requeridas en la sección de "Repository Variables" de BitBucket.

2. **bitbucket-pipelines.yml**: Este archivo define el pipeline de CI/CD y pasa las variables desde BitBucket a AWS App Runner durante el despliegue.

3. **apprunner.yaml**: Este archivo configura la aplicación en AWS App Runner y recibe las variables de entorno pasadas desde el pipeline.

El flujo es el siguiente:
- Las variables se definen en BitBucket como `$COMPANION_SECRET`, etc.
- El pipeline las toma y las pasa al servicio de AWS App Runner
- El archivo apprunner.yaml las recibe usando la sintaxis `${COMPANION_SECRET}`
- La aplicación Node.js las accede como `process.env.COMPANION_SECRET`

### Despliegue

El despliegue se realiza automáticamente al hacer push a la rama principal del repositorio.

## Desarrollo local

1. Crea un archivo .env en la raíz del proyecto con las variables mencionadas arriba
2. Instala las dependencias: `npm install`
3. Inicia el servidor: `node index.js`
4. El servidor estará disponible en: http://localhost:3020 