# TableCRM Mobile Order Form

Мобильное веб-приложение для создания заказов в TableCRM системе.

## Описание проекта

Это тестовое задание для позиции React-разработчика в tablecrm.com. Приложение представляет собой мобильную форму оформления заказа, которая взаимодействует с API TableCRM для создания продаж.

## Функциональность

- **Авторизация по токену** - ввод и сохранение токена для доступа к API
- **Поиск клиентов** - поиск контрагентов по номеру телефона
- **Управление заказом**:
  - Выбор счета (paybox)
  - Выбор организации
  - Выбор склада
  - Выбор типа цен
  - Добавление товаров с указанием количества и скидки
- **Создание продажи** - два режима: "Создать продажу" и "Создать и провести"

## Технологический стек

- **React 19 with React Compiler**
- **TypeScript 5.9** - типизация
- **Vite (Rolldown)** - сборщик и dev-сервер
- **Axios** - HTTP клиент для работы с API
- **Shadcn UI** - UI компоненты
- **Tailwind CSS** - утилитарные стили
- **Lucide React** - иконки
- **Biome** - линтер и форматтер
- **Tanstack/Query** - query client для работы с запросами

## API Endpoints

Документация API доступна по адресу: https://app.tablecrm.com/api/v1/docs

Основные эндпоинты:
- `/contragents/` - Клиенты
- `/warehouses/` - Склады
- `/payboxes/` - Счета
- `/organizations/` - Организации
- `/price_types/` - Типы цен
- `/nomenclature/` - Товары
- `/docs_sales/` - Создание продажи (POST)


## Установка и запуск
```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview

# Линтинг и проверка неиспользуемого кода
npm run lint

# Форматирование кода
npm run format
```

## Path Aliases

Проект использует алиасы для удобного импорта:
```typescript
import { api } from '@/services/api'
import { useLocalStorage } from '@/shared/hooks'
import { ClientSearch } from '@/components/ClientSearch'
import { AuthPage } from '@/app/pages/AuthPage'
```

## Пример Payload
```json
[{
  "priority": 0,
  "dated": 1763475446,
  "operation": "Заказ",
  "tax_included": true,
  "tax_active": true,
  "goods": [{
    "price": 400,
    "quantity": 1,
    "unit": 116,
    "discount": 10,
    "sum_discounted": 10,
    "nomenclature": 54990
  }],
  "settings": {},
  "loyality_card_id": 71047,
  "warehouse": 39,
  "contragent": 793110,
  "paybox": 550,
  "organization": 207,
  "status": false,
  "paid_rubles": 390,
  "paid_lt": 0
}]
```

## Деплой

Проект развернут на Vercel: [ссылка будет добавлена после деплоя]

## Особенности реализации

- Токен сохраняется в `localStorage` для персистентности между сессиями
- Все API запросы включают токен в query параметре `?token=...`
- Адаптивная верстка для мобильных устройств
- Валидация обязательных полей перед отправкой
- Обработка ошибок API с понятными сообщениями пользователю
- Автоматический расчет итоговой суммы с учетом скидок
- Debounce для поиска клиентов по телефону
- Переиспользуемые компоненты на базе Ant Design

## Архитектурные решения

- **Чистая архитектура** - четкое разделение на слои (app, components, services, shared)
- **Feature-oriented structure** - группировка по функциональности
- **Custom hooks** - переиспользуемая бизнес-логика
- **TypeScript** - строгая типизация для безопасности
- **Separation of concerns** - разделение UI, логики и API

## Референс

Пример реализации: https://tablecrm-mobile-order.vercel.app

Модальное окно TableCRM: https://app.tablecrm.com/docs_sales?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77

## Контакт

Telegram: @rushan_hh

---

Разработано в рамках тестового задания для tablecrm.com