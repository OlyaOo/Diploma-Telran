Garden Products — интернет-магазин (монорепо)

Полноценный учебный проект «Интернет-магазин товаров для дома и сада». Монорепозиторий объединяет SPA на React + Vite и REST API на Express + Sequelize с общей структурой, едиными сценариями запуска и готовыми мок-данными.

Оглавление

Особенности

Стек технологий

Структура монорепозитория

Быстрый старт

Скрипты

Переменные окружения

Frontend: архитектура

Backend: архитектура

Рабочий процесс и расширение функциональности

TODO / Roadmap

Авторы

Особенности

Единый монорепозиторий: фронтенд и бекенд рядом, используют общие скрипты и настройки окружения.

Файловая структура фронтенда построена по принципам feature-sliced.

Преднастроенный Redux Toolkit, React Router 6, axios-инстанс.

REST API на Express + Sequelize + SQLite с сид-данными.

Два dev-сервера, запускаемых одной командой (pnpm dev).

Стек технологий

Frontend

Vite + React 18

Redux Toolkit, React Router DOM

Axios, React Hook Form, normalize.css, lucide-react

Backend

Node.js 18+, Express 4

Sequelize 6 + SQLite

Nodemon, CORS, статика Express

Структура монорепозитория
Diploma-Telran/
├─ frontend/                        
│  ├─ src/
│  │  ├─ api/               
│  │  ├─ app/               
│  │  ├─ assets/            
│  │  ├─ common/            
│  │  │  ├─ components/     
│  │  │  └─ utils/          
│  │  ├─ features/          
│  │  ├─ redux/             
│  │  └─ styles/            
│  ├─ vite.config.js        
│  └─ package.json
│
├─ backend/                         
│  ├─ index.js                      
│  ├─ routes/                       
│  ├─ database/                     
│  │  └─ models/                    
│  ├─ public/                       
│  └─ package.json
│
├─ package.json                     
└─ README.md                        

Быстрый старт
Требования

Node.js 18+

PNPM 8+

Установка зависимостей
pnpm install

Режим разработки
pnpm dev


Запустит API на :3333 и фронт на :5173.

Скрипты
Команда	Что делает
pnpm dev	Запускает backend + frontend через concurrently.
pnpm --filter backend dev	Только API с nodemon.
pnpm --filter frontend dev	Только фронтенд (Vite).
pnpm --filter frontend build	Сборка SPA.
pnpm --filter frontend preview	Предпросмотр сборки.
Переменные окружения

Frontend

# frontend/.env
VITE_API_URL=http://localhost:3333


Backend

SQLite (backend/database.sqlite) по умолчанию.

Для другой СУБД — обновить database/database.js.

Frontend: архитектура

src/api — общий axios-инстанс.

src/app — маршруты, провайдеры.

src/common — UI и утилиты.

src/features — бизнес-модули (products, categories, cart и др.).

src/redux — store и slices.

src/styles — глобальные стили и темы.

Маршруты (React Router v6):

/ — главная

/products — каталог

/product/:id — карточка товара

/categories, /category/:id

/sales, /favorites, /cart

* — 404

Backend: архитектура

Express-приложение (порт 3333).

Sequelize + SQLite: Category, Product.

REST API (/products, /categories, /order, /sale).

Статика из backend/public.

Рабочий процесс и расширение функциональности

Создайте новую фичу в frontend/src/features/<feature>.

Добавьте slice в redux/slices и зарегистрируйте в store.js.

Подключите страницу в App.jsx.

Для API-запросов используйте общий @api/axios.js.

Для новых эндпоинтов расширяйте backend/routes и модели Sequelize.

TODO / Roadmap

 Тёмная тема (localStorage).

 Формы (react-hook-form).

 Фильтры и сортировки.

 Пагинация и skeletons.

 Persist для корзины/избранного.

 Unit-тесты.

 CI/CD: деплой фронта и API.

Авторы

Иван — team lead

Алекс

Елена Корж

Оля Одарюк