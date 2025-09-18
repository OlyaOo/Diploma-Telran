import s from './SceletonGrid.module.css';

export default function SceletonGrid({
  count = 12,
  itemHeight = 422,      
  borderRadius = 12,

}) {
  const itemStyle = { height: `${itemHeight}px`, borderRadius: `${borderRadius}px` };
  const indices = [...Array(count).keys()]; // [0,1,2,...,count-1]

  return (
    <div className={s.grid}>
      {indices.map((i) => (
        <div key={i} className={s.item} style={itemStyle} />
      ))}
    </div>
  );
}
