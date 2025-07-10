# Структура проекта

Проект «HotelAggregator» состоит из двух основных частей: backend (NestJS API) и frontend (React SPA).Backend реализован на NestJS с использованием MongoDB через Mongoose.Все данные хранятся в базе MongoDB.

# Способы развёртывания и запуска приложения

Проект может быть запущен локально или через Docker.Все переменные окружения вынесены в .env файлы для гибкости.Поддерживается работа через Vite для фронтенда и NestJS CLI для бэкенда.Основные переменные окружения:
HTTP_PORT=3000
WS_PORT=3001
MONGO_URL=mongodb://admin:admin@localhost:27017/hotelaggregator?authSource=admin
SESSION_SECRET=my-secret-key
VITE_API_URL=http://localhost:3000
VITE_WS_URL=http://localhost:3001
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin

## Запуск через Docker:

docker-compose up --build

## Локальный запуск:

cd backend && npm install && npm run start:dev
cd ../frontend && npm install && npm run dev
