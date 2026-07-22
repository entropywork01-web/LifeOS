import "../../styles/UI.css";

function Card({ children, className = "" }) {
  return (
    <div className={`lifeos-card ${className}`}>
      {children}
    </div>
  );
}

export default Card;