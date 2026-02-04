import "./StatCard.scss";

export default function StatCard({
  title,
  value,
  bg,
  icon,
}: {
  title: string;
  value: string;
  bg: string;
  icon: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ backgroundColor: bg }}>
        <img src={icon} alt={title} />
      </div>

      <p className="stat-card__title">{title}</p>
      <h3 className="stat-card__value">{value}</h3>
    </div>
  );
}
