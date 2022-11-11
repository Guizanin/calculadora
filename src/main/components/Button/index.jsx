import "./Button.css";

export const Button = (props) => (
  <button
    id={props.id}
    onClick={(e) => props.click && props.click(props.label)}
    className={`
        button
        ${props.operation ? "operation" : ""}
        ${props.double ? "double" : ""}
        ${props.triple ? "triple" : ""}
      `}
  >
    {props.label}
  </button>
);
