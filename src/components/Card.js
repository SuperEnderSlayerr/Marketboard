import "./Card.css";
const Card = ({ className, children }) => {
  const classes = "card " + className;
  return <div className={classes}>{children}</div>;
};

export default Card;
