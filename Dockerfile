# Usar una imagen de Node.js como base
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app
RUN npm install -g npm@8

# Copiar los archivos package.json y package-lock.json
COPY ./frontend/package*.json ./frontend/
COPY ./backend/package*.json ./backend/

# Instalar las dependencias del frontend y del backend
RUN cd ./frontend && npm install
RUN cd ./backend && npm install

# Copiar el resto del código del frontend y del backend
COPY ./frontend ./frontend
COPY ./backend ./backend
RUN cd ./frontend && npm run build

# Exponer los puertos que tus aplicaciones utilizan
EXPOSE 80

# Comando para iniciar las aplicaciones
CMD ["sh", "-c", "cd ./backend && npm start"]