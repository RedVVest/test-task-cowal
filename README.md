# Заказы на замену окон

Мини-приложение на React Native (Expo) для учёта заказов на замену окон.

## Экраны

- **Заказы (Home)** — список заказов из мок-данных с фильтром по статусу (Все / Новые / В работе / Завершённые) и кнопкой «+» для создания нового заказа.
- **Детали заказа (OrderDetails)** — полная информация о заказе и кнопка «Изменить статус» (Новый → В работе → Завершён → Новый).
- **Новый заказ (CreateOrder)** — форма с валидацией: имя клиента, адрес, тип окна, ширина и высота.

## Запуск

Требуется Node.js 20+ и приложение [Expo Go](https://expo.dev/go) на телефоне либо iOS-симулятор / Android-эмулятор.

```bash
pnpm install
pnpm expo start
```

Затем:

- отсканируйте QR-код в Expo Go, или
- нажмите `i` для iOS-симулятора / `a` для Android-эмулятора.

Запуск на устройстве (нативная сборка, нужен Xcode):

```bash
pnpm ios --device
```

Проверка типов:

```bash
pnpm tsc --noEmit
```

## Стек

- Expo + React Native, TypeScript
- React Navigation (native stack)
- Состояние: React Context + `useReducer`
- Стили: `StyleSheet`

## Структура

```
App.tsx                      — провайдеры и контейнер навигации
src/
  navigation/RootNavigator   — стек экранов и типы параметров
  screens/                   — HomeScreen, OrderDetailsScreen, CreateOrderScreen
  components/                — OrderCard, StatusBadge, StatusFilter, FormField, SelectField, DetailRow
  context/OrdersContext      — хранилище заказов (добавление, смена статуса)
  utils/                     — статусы, типы окон, дата, валидация, номер заказа
  data/orders.json           — мок-данные (8 заказов)
  types/order.ts             — модель заказа
  theme.ts                   — цвета и отступы
```

## Решения

- Заказы хранятся в памяти (Context), без персистентности — по условию задачи.
- Выпадающий список типа окна реализован собственным компонентом на `Modal`, чтобы не тянуть лишние зависимости.
- Новому заказу присваивается следующий номер вида `ORD-009` и статус «Новый».
