import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ children }) => {
  // For responsive navigation bar
  const responsiveNav = (event) => {
    event.preventDefault();
    var x = document.getElementById("myTopnav");
    console.log(x.className);
    if (x.className === styles.nav) {
      x.className += ` ${styles.responsive}`;
    } else {
      x.className = styles.nav;
    }
  };
  // Responsive navigation bar for mobiles.
  useEffect(() => {
    const responsiveButton = document.getElementById("responsiveButton");
    responsiveButton.addEventListener("click", responsiveNav);
    return () => {
      responsiveButton.removeEventListener("click", responsiveNav);
    };
  }, []);

  return (
    <div className={styles.nav} id="myTopnav">
      <Link to="/" className={styles.active}>
        Ticket App
      </Link>
      {children}
      <a href="/" id="responsiveButton" className={styles.icon}>
        <span>=</span>
      </a>
    </div>
  );
};

export default Header;
