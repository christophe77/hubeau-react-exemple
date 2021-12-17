import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import ResponsiveAppBar from "./header/ResponsiveAppBar";
import routes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <CssBaseline />
      <Container maxWidth="xl" style={{ padding: "20px" }}>
        <Switch>
          {routes &&
            routes.length > 0 &&
            routes.map((route) => {
              const { key, path, exact, component } = route;
              return (
                <Route
                  key={key}
                  path={path}
                  exact={exact}
                  component={component}
                />
              );
            })}
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
