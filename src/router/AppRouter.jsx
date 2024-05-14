import { Outlet, Route, Router, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { Register } from "../components/Register";
import { Administrador } from "../pages/Administrador";
import { OrderPage } from "../pages/OrderPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/Registro" element={<Register />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      {/* <Route path="/Adm/*" element={<Administrador />}>
         La ruta '/productos' ahora está anidada bajo '/Adm/*' 
        <Route path="productos" element={<Productos />} />
        <Route path="ingrediente" element={<Ingredientes />} />
      </Route> */}
      <Route path="/order" element={<OrderPage />} />
      <Route path="/Adm" element={<Administrador />} />
    </Routes>
  );
};
export default AppRouter;
