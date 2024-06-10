import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import Loading from "./components/Loading";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Device = lazy(() => import("./pages/device"));
const DeviceView = lazy(() => import("./pages/device/view.js"));
const Manpower = lazy(() => import("./pages/manpower"));
const Workorder = lazy(() => import("./pages/workorder"));
const Recomendation = lazy(() => import("./pages/recomendation"));
const Login = lazy(() => import("./pages/login"));
const RecomendationCreate = lazy(() =>
  import("./pages/recomendation/create.js")
);
const RecomendationUpdate = lazy(() =>
  import("./pages/recomendation/update.js")
);

const Chart = lazy(() => import("./pages/chart"));

function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="device" element={<Device />} />
            <Route path="view-device/:id" element={<DeviceView />} />
            <Route path="manpower" element={<Manpower />} />
            <Route path="workorder" element={<Workorder />} />
            <Route path="recomendation" element={<Recomendation />} />
            <Route
              path="create-recomendation"
              element={<RecomendationCreate />}
            />{" "}
            <Route
              path="update-recomendation/:id"
              element={<RecomendationUpdate />}
            />
            <Route path="chart" element={<Chart />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
