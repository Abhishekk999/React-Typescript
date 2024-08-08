import React, { useEffect } from "react";
import "./section.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

const Header: React.FC<{}> = () => {
  const { themes, themeIndex, setTheme } = useTheme();

  useEffect(() => {
    const selectedTheme = themes[themeIndex];
    document.documentElement.style.setProperty(
      "--primary-color",
      selectedTheme.primary
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      selectedTheme.secondary
    );
  }, [themeIndex, themes]);

  return (
    <div className="header">
      <nav>
        {/* <ul>
          <li>
            <Link to="/dashboard/card">Card</Link>
          </li>
          <li>
            <Link to="/dashboard/currency-converter">Currency-converter</Link>
          </li>
          <li>
            <Link to="/dashboard/list">Table</Link>
          </li>
        </ul> */}
        <div className="color_body">
          {themes.map((theme, index) => (
            <div
              className="color_box"
              style={{ backgroundColor: theme.primary }}
              key={index}
              onClick={() => setTheme(index)}
            ></div>
          ))}
        </div>
        <ul style={{ position: "absolute", right: "30px" }}>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
