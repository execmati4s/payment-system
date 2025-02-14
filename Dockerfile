# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala todas las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto en el que tu API escuchará
EXPOSE 4000

# Comando para ejecutar la aplicación en producción
CMD ["node", "dist/index.js"]
