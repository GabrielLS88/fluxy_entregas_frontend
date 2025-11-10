import CriarEntrega from "../pages/CriarEntrega/CriarEntrega";
import Entregas from "../pages/Entregas/Entregas";
import AtualizarEntrega from "../pages/AtualizarEntrega/AtualizarEntrega";
import { Routes, Route } from "react-router-dom";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Entregas />} />
      <Route path="/cadastrarentrega" element={<CriarEntrega />} />
      <Route path="/atualizarentrega" element={<AtualizarEntrega />} />
    </Routes>
  );
}