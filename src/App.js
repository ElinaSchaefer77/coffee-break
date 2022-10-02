import { Routes, Route } from "react-router-dom";
import ParticipantsScreen from "./screens/ParticipantsScreen";
import RoomsScreen from "./screens/RoomsScreen";
import ResultScreen from "./screens/ResultScreen";
import RateScreen from "./screens/RateScreen";
import LayoutScreen from "./screens/LayoutScreen";
import NoMatchScreen from "./screens/NoMatchScreen";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path={`/`} element={<LayoutScreen />}>
          <Route index element={<ParticipantsScreen />} />
          <Route path={`/:id`} element={<ParticipantsScreen />} />
          <Route path={`/:id/rooms`} element={<RoomsScreen />} />
          <Route path={`/:id/rooms/result`} element={<ResultScreen />} />
          <Route path={`/:id/rooms/result/rated"`} element={<RateScreen />} />
          <Route path={`*`} element={<NoMatchScreen />} />
        </Route>
      </Routes>
    </div>
  );
}
