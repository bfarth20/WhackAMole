export default function Hole({ isActive, onClick }) {
  return <div className={`hole ${isActive ? "mole" : ""}`} onClick={onClick} />;
}
