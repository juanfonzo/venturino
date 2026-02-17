########################################################################
# Etapa 1: Builder — instalar dependencias y construir la aplicación   #
########################################################################
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl libc6-compat

# Establecer el directorio de trabajo
WORKDIR /app

# DATABASE_URL para comandos de Prisma durante el build
ARG DATABASE_URL

# Copiar archivos de manifiesto
COPY package*.json ./

# Instalar todas las dependencias (incluye dev, TailwindCSS, plugins)
RUN npm ci --ignore-scripts


# Copiar el resto de la aplicación
COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

# Ejecutar build de Next.js (incluye paso de PostCSS/Tailwind)
RUN npm run build

########################################################################
# Etapa 2: Runner — crear la imagen final de producción               #
########################################################################
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl libc6-compat

# Variables de entorno para producción
ENV NODE_ENV=production

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias de producción desde builder
COPY --from=builder /app/node_modules ./node_modules

# Copiar build y recursos estáticos
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copiar scripts de pipeline (necesarios para ejecución en producción)
COPY --from=builder /app/scripts ./scripts

# Directorio para outputs del pipeline (ej. sample dry-run)
RUN mkdir -p /app/data

# Copiar archivos de datos (ACARA CSV, etc.)
COPY --from=builder /app/data ./data

# Copiar el schema de Prisma y las migraciones
COPY --from=builder /app/prisma ./prisma

# Copiar package.json (necesario para npm run start)
COPY --from=builder /app/package.json ./

# Exponer el puerto de la aplicación Next.js
EXPOSE 3000

# Comando de arranque: levantar el servidor
CMD ["npm", "run", "start", "--", "-p", "3000", "-H", "0.0.0.0"] 
