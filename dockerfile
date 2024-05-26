# Use a imagem base do PostgreSQL
FROM postgres:latest
# Configurar o diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Compilar TypeScript (se aplicável)
RUN npm run build

# Expor a porta que a aplicação vai rodar
EXPOSE 3333

# Definir o comando para rodar a aplicação
CMD ["npm", "start"]


# Defina variáveis de ambiente (opcional)
ENV DATABASE_HOST=localhost
ENV DATABASE_USER=postgres
ENV DATABASE_NAME=my-database
ENV DATABASE_PASSWORD=root
ENV DATABASE_PORT=5432

