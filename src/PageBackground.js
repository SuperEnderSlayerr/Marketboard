import "./PageBackground.css";

const PageBackground = ({ className, children }) => {
  const classes = "page_content " + className;
  return (
    <div className="page_grid">
      <div className={classes}>
        <div className="page_background"></div>
        <div className="gradient_background"></div>
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
