# Use a imagem base do PostgreSQL
FROM postgres:latest

# Defina variáveis de ambiente (opcional)
ENV DATABASE_HOST=localhost
ENV DATABASE_USER=postgres
ENV DATABASE_NAME=my-database
ENV DATABASE_PASSWORD=root
ENV DATABASE_PORT=5432