# Usa una imagen base de Node.js
FROM node:18
# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --production

# Copia todo el código de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación escuchará
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
