# Movie App

## Описание

Приложение для просмотра информации о фильмах с использованием React, TypeScript и API Кинопоиска.

![Preview](public/app-preview)

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

## Переменные окружения

Создайте файл `.env` на основе `.env.default` и добавьте свой API ключ.

**.env.default**:

```plaintext
VITE_KINOPOISK_API_KEY=your_api_key_here
```

## Функционал

- Отображение списка фильмов
- Фильтрация фильмов
- Просмотр детальной информации о фильме
- Добавление фильмов в избранное с персистентностью

## Стек

- Vite, ESLint, Prettier
- React
- TS
- Redux, Redux Toolkit, RTK Query, redux-persist
- MUI
- React Router

## Проблемы, требующие внимания, на которых не хватило времени

- По личным причнам, проект, к сожалению, начал разрабатываться лишь за 10 часов до дедлайна
- Отсутствие тестов: можно добавить тесты на Redux и состояния
- Использование Dto объектов напрямую без дополнительного слоя абстракции
- Плохой рефакторинг кода
- Не использование автоматической генерации api с OpenAPI RTK Query codegen: за несколько часов дебага не удалось выяснить
  причину молчаливого `exit code 1` при попытке запустить кодогенерацию
