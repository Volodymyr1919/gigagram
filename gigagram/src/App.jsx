import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout/Layout";
import MainRoutes from "./routes/MainRoutes"
// eslint-disable-next-line no-unused-vars
import appStyle from "./scss/app.scss"

function App() {
  return (
    <Router>
      <Layout>
        <hr />
        <MainRoutes/>
      </Layout>
    </Router>
  );
}

export default App;