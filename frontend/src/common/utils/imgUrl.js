// Строит абсолютный URL для картинки из относительного пути (напр. "/product_img/23.jpeg")
export function imgUrl(path) {
  if (!path) return null;                         // пусть onError подставит fallback
  if (/^https?:\/\//i.test(path)) return path;    // уже абсолютный

  const raw = import.meta.env.VITE_API_URL || '';
  const base = raw.replace(/\/+$/, '').replace(/\/(products|api)\/?$/, '');
  const rel  = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rel}`;
}

// Абсолютный URL для серверной заглушки (backend/public/fallback.jpeg)
export function backendFallbackUrl() {
  const raw = import.meta.env.VITE_API_URL || '';
  const base = raw.replace(/\/+$/, '').replace(/\/(products|api)\/?$/, '');
  return `${base}/fallback.jpeg`;
}
