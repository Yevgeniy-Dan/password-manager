import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate, Link } from "react-router-dom";
import { logOut } from "../store/auth-actions";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const loginHandler = () => {
    navigate("/login", { replace: true });
  };

  const signInHandler = () => {
    navigate("/register");
  };

  const logoutHandle = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(logOut());
  };

  return (
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <p className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <span className="fs-4">PasswordManager</span>
        </p>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {isAuth && (
            <li>
              <Link to="/dashboard" className="nav-link px-2 link-secondary">
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="col-md-3 text-end">
          {!isAuth ? (
            <>
              <button
                onClick={loginHandler}
                type="button"
                className="btn btn-outline-primary me-2"
              >
                Login
              </button>
              <button
                onClick={signInHandler}
                type="button"
                className="btn btn-warning"
              >
                Sign-up
              </button>
            </>
          ) : (
            <button
              onClick={logoutHandle}
              type="button"
              className="btn btn-warning"
            >
              Logout
            </button>
          )}
        </div>
      </header>
  );
};

export default Header;
