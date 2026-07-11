import "../../styles/UI.css";

function Button({ children, onClick, type = "button" }) {
  return (
    <button className="lifeos-button" onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;