import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ResponsiveAppBar from "./header/ResponsiveAppBar";
import HomePage from "./pages/Home";
import QualiteEauPotable from "./pages/QualiteEauPotable";

const App = () => (
    <BrowserRouter>
      <ResponsiveAppBar />
      <CssBaseline />
      <Container maxWidth="xl" style={{ padding: "20px" }}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/qualite-eau-potable"
            exact
            component={QualiteEauPotable}
          />
        </Switch>
      </Container>
    </BrowserRouter>
);

export default App;
