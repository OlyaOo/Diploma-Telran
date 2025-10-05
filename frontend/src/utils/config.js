// адрес бэкенда из .env (пример: https://your-backend.onrender.com)
export const API_URL = import.meta.env.VITE_API_URL;

// универсальный склеиватель путей к картинкам
export const imgUrl = (path) =>
  /^https?:\/\//i.test(path) ? path : `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;

// абсолютный URL fallback-картинки на бэкенде
export const FALLBACK_IMG = `${API_URL}/images/fallback.jpeg`;
