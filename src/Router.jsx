import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/indexLayout";
import Home from "./components/Home/indexHome";
import PiscinaList from "./components/Piscina/ListPiscinas/index.ListPiscinas";
import AdminPiscinas from "./components/Piscina/AdminPiscinas/AdminPiscinas";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import Cart from "./components/Cart/Cart";
import PiscinaState from "./contexts/Piscina/PiscinaState";
import UserState from "./contexts/User/UserState";
import CartState from "./contexts/Cart/CartState";

const Router = () => {
    return (
        <UserState>
            <CartState>
                <PiscinaState>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="piscinas" element={<PiscinaList />} />
                                <Route path="admin/piscinas" element={<AdminPiscinas />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="cart" element={<Cart />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </PiscinaState>
            </CartState>
        </UserState>
    )
}

export default Router;
