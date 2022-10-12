import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
