import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
