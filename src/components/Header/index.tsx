// style
import style from "./Header.module.scss";
// Routing
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.brand}>
        <img src="https://storage.googleapis.com/bosta-files/sllr_store_images/NDczNTIzX18yMDI0LTA1LTE1VDEyOjA3OjIxLjEzNlpfTG9nbyAoMikucG5n.png" />
      </div>
    </div>
  );
};

export default Header;
