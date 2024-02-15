import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

function appRoutes() {
  return (
    // Aqui eu fiz a importação de todas as rotas que eu criei, e defini o que cada uma delas vai renderizar. Mantendo a organização do código.
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  );
}

export default appRoutes;
