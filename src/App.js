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
        <Route path={`${process.env.PUBLIC_URL}/`} element={<LayoutScreen />}>
          <Route index element={<ParticipantsScreen />} />
          <Route
            path={`${process.env.PUBLIC_URL}/:id`}
            element={<ParticipantsScreen />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:id/rooms`}
            element={<RoomsScreen />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:id/rooms/result`}
            element={<ResultScreen />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:id/rooms/result/rated"`}
            element={<RateScreen />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/*`}
            element={<NoMatchScreen />}
          />
        </Route>
      </Routes>
    </div>
  );
}
