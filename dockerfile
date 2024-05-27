# Use a imagem base do Node.js
FROM node:20

# Configurar o diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências e rodar o postinstall
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Rodar o build para produção
RUN npm run postinstall

# Expor a porta que a aplicação vai rodar
EXPOSE 3333

# Definir o comando para rodar a aplicação no modo de produção
CMD ["npm", "run", "production"]
