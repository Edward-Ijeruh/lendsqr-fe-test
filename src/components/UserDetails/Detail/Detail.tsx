import "./Detail.scss";

export default function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="detail">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}
