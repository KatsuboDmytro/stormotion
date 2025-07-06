import { Outlet } from "react-router";
import './app.css';

export const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
}