import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ResponsiveAppBar from "./header/ResponsiveAppBar";
import routes from "./routes";
import theme from "./theme";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
