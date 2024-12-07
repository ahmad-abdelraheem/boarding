// style
import { Link } from "react-router-dom";
import style from "./Header.module.scss";
// Routing

const Header = () => {
  return (
    <div className={style.header}>
      <Link to='/' className={style.brand}>
        <img src="https://storage.googleapis.com/bosta-files/sllr_store_images/NDczNTIzX18yMDI0LTA1LTE1VDEyOjA3OjIxLjEzNlpfTG9nbyAoMikucG5n.png" />
      </Link>
    </div>
  );
};

export default Header;
