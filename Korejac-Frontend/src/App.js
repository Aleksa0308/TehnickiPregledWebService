import { BrowserRouter, Routes, Route } from "react-router-dom";
import Evidencija from "./pages/Evidencija";
import SingleEvidencija from "./pages/SingleEvidencija";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SharedLayout from "./pages/SharedLayout";
import Admin from "./pages/Admin";
import RouteGuard from "./Utils/RouteGuard";
import RouteGuardAdmin from "./Utils/RouteGuardAdmin";
import Statistics from "./pages/Statistics";
import SingleStatistics from "./pages/SingleStatistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<RouteGuard />}>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="evidencija" element={<Evidencija />} />
            <Route path="evidencija/:datum" element={<SingleEvidencija />} />
            <Route element={<RouteGuardAdmin />}>
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route element={<RouteGuardAdmin />}>
              <Route path="statistika" element={<Statistics />} />
            </Route>
            <Route element={<RouteGuardAdmin />}>
              <Route path="statistika/:datum" element={<SingleStatistics />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
