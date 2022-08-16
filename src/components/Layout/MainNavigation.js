import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-Context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { userIsLoggedIn , logoutHandler } = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {
            !userIsLoggedIn && <li>
            <Link to="/auth">Login</Link>
          </li>
          }
          { userIsLoggedIn && <li>
            <Link to="/profile">Profile</Link>
          </li>}

          { userIsLoggedIn && <li>
            <button onClick={ logoutHandler }>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
