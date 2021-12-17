import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import routes from "../../routes";

const useStyles = makeStyles(() => ({
  pageTitle: {
    padding: "5px",
    marginBottom:"10px"
  },
  pageTitleItems: {
    gap: "20px",
    display: "flex",
    alignItems: "center",
  },
}));
type Route = {
  key: number;
  path: string;
  exact: boolean;
  component: () => JSX.Element;
  title: string;
  image: string;
};
type PageTitleProps = {
  path: string;
};
export default function PageTitle(props: PageTitleProps) {
  const { path } = props;
  const classes = useStyles();
  const [currentRoute, setCurrentRoute] = useState<Route>();

  useEffect(() => {
    if (routes) {
      routes.forEach((route) => {
        if (route.path === path) {
          setCurrentRoute(route);
        }
      });
    }
  }, [path]);

  return (
    <div className={classes.pageTitle}>
      {currentRoute && (
        <div key={currentRoute.key} className={classes.pageTitleItems}>
          <img width="78px" src={currentRoute.image} alt={currentRoute.title} />
          <h2>{currentRoute.title}</h2>
        </div>
      )}
    </div>
  );
}
