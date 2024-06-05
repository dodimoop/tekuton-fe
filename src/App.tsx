import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hobby from "./pages/hobby/Hobby";
import PageNotFound from "./pages/not-found/PageNotFound";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import User from "./pages/user/User";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/users" element={<User />}></Route>
        <Route path="/hobby" element={<Hobby />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
