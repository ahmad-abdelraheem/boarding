// style
import { Link } from "react-router-dom";
import style from "./Header.module.scss";
// Routing

const Header = () => {
  return (
    <div className={style.header}>
      <Link to='/' className={style.brand}>
        <img src="src/assets/text3D.png" />
      </Link>
    </div>
  );
};

export default Header;
