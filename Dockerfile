# Step 1: Build the React app
FROM node:20 as vite-build

WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package.json package-lock.json ./ 

# Instalar dependencias
RUN npm install  # Cambiar yarn por npm

# Copiar el resto del código fuente de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build  # Cambiar yarn build por npm run build

# Step 2: Servir la app usando Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=vite-build /app/dist /usr/share/nginx/html

# Expose port 3000 to the Docker host, so we can access it 
# from the outside. This is a placeholder; Cloud Run will provide the PORT environment variable at runtime.
ENV PORT 3000
ENV HOST 0.0.0.0
ENV VITE_API_URL https://prueba-mp-backend-834460423898.us-central1.run.app/api/v1/
EXPOSE 3000
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"