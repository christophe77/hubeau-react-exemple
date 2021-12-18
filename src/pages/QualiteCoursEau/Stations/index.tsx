import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Station } from "../types";

type StationsProps = {
  stations: Station[];
  getResultats: (codeStation: string) => void;
};
const useStyles = makeStyles(() => ({
  paper: {
    width: "100%",
    marginTop: "15px",
    display: "flex",
  },
  buttonGroupSm: {
    width: "100%",
  },
  buttonGroupXs: {
    width: "inherit",
  },
  buttonSm: {},
  buttonXs: {
    margin: "5px 5px 5px 5px",

  },
}));
export default function Stations(props: StationsProps) {
  const { stations, getResultats } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [codeStation, setCodeStation] = useState<string>("");
  return (
    <Paper className={classes.paper}>
      {stations?.length > 0 && (
        <ButtonGroup
          className={isUpSm ? classes.buttonGroupSm : classes.buttonGroupXs}
          orientation={isUpSm ? "horizontal" : "vertical"}
          variant="contained"
          aria-label="outlined primary button group"
        >
          {stations.map((station) => {
            return (
              <Button
                key={station.code_station}
                className={isUpSm ? classes.buttonSm : classes.buttonXs}
                color={
                  station.code_station === codeStation ? "secondary" : "primary"
                }
                onClick={() => {
                  setCodeStation(station.code_station);
                  getResultats(station.code_station);
                }}
              >
                {station.libelle_station}
              </Button>
            );
          })}
        </ButtonGroup>
      )}
    </Paper>
  );
}
