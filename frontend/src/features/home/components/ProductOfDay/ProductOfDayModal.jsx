import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '@api/axios.js';
import { addToCart } from '@redux/slices/cartSlice.js';
import { close, selectProductOfDay, selectProductOfDayState } from '@redux/slices/productOfDaySlice.js';
import styles from './ProductOfDayModal.module.css';
import { addFavorite, selectFavoriteIds } from '@redux/slices/favoritesSlice.js';

// ---------- API origin (без VITE_API_ORIGIN) ----------
function getApiOrigin() {
  const base = api?.defaults?.baseURL; // берётся из VITE_API_URL или http://localhost:3333
  if (!base) return '';
  try {
    // Работает и для абсолютного, и для относительного baseURL
    return new URL(base, window.location.origin).origin.replace(/\/$/, '');
  } catch {
    return '';
  }
}
const API_ORIGIN = getApiOrigin();

// Абсолютный URL для картинок/путей
function buildImgUrl(p) {
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;                // уже абсолютный
  if (!API_ORIGIN) return p.startsWith('/') ? p : `/${p}`; // fallback на относительный
  return API_ORIGIN + (p.startsWith('/') ? '' : '/') + p;
}

export default function ProductOfDayModal() {
  const dispatch = useDispatch();
  const { isOpen, status } = useSelector(selectProductOfDayState);
  const data = useSelector(selectProductOfDay); // { product, discountedPrice, discountPct } | null

  // IDs избранного из стора
  const favIds = useSelector(selectFavoriteIds);

  // ID текущего товара и флаг "в избранном?"
  const productId = data?.product?.id;
  const isFav = productId != null && favIds.includes(String(productId));

  // toggle избранного по ID (slice делает это одним экшеном)
  const onToggleFav = (e) => {
    e.stopPropagation();
    if (productId == null) return;
    dispatch(addFavorite(productId));
  };

  // Close modal on ESC + блокируем скролл
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && dispatch(close());
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const onAdd = () => {
    if (!data) return;
    const { product, discountedPrice } = data;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: discountedPrice, // уже -50%
        image: product.image,
        quantity: 1,
      })
    );
    dispatch(close());
  };

  // picture URL
  const imgSrc = buildImgUrl(data?.product?.image);

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={() => dispatch(close())}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={() => dispatch(close())} />

        {status !== 'ready' || !data ? (
          <div className={styles.loading}>Loading…</div>
        ) : (
          <>
            <div className={styles.header}>
              <h3 className={styles.title}>50% discount on product of the day!</h3>
            </div>

            <div className={styles.body}>
              <div className={styles.media}>
                <img
                  className={styles.img}
                  src={imgSrc}
                  alt={data.product.title}
                  onError={(e) => {
                    e.currentTarget.src = buildImgUrl('/product_img/placeholder.png');
                  }}
                />
                <span className={styles.imgBadge}>-50%</span>
                <button
                  type="button"
                  className={`${styles.favBtn} ${isFav ? styles.favBtn_active : ''}`}
                  onClick={onToggleFav}
                  aria-pressed={isFav}
                  aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{data.product.title}</div>
                <div className={styles.prices}>
                  <span className={styles.now}>${data.discountedPrice}</span>
                  <s className={styles.old}>${Number(data.product.price)}</s>
                </div>
              </div>
            </div>
            <button className={styles.add} onClick={onAdd}>Add to cart</button>
          </>
        )}
      </div>
    </div>
  );
}
