import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, selectIsFavorite } from '@redux/slices/favoritesSlice.js';
import styles from './FavoriteButton.module.css';

export default function FavoriteButton({ productId, className = '' }) {
    const dispatch = useDispatch();
    const isFavorite = useSelector(state => selectIsFavorite(state, productId));
    const onToggle = () => dispatch(addFavorite(productId));
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`${className} ${isFavorite ? styles.isActive : ''}`}
        >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    )

}