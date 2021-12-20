import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Station, QceError } from "../types";

type StationsProps = {
  stations: Station[];
  getResultats: (codeStation: string) => void;
  error: QceError;
};
const useStyles = makeStyles(() => ({
  paperXs: {
    width: "100%",
    marginTop: "15px",
    display: "flex",
  },
  paperSm: {
    width: "100%",
    marginTop: "15px",
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
  },
  buttonGroupSm: {
    width: "100%",
  },
  buttonGroupXs: {
    width: "inherit",
  },
  buttonSm: { minWidth: "150px", margin: "5px 5px 5px 5px" },
  buttonXs: {
    margin: "5px 5px 5px 5px",
  },
  noStation: {
    width: "100%",
    textAlign: "center",
  },
}));
export default function Stations(props: StationsProps) {
  const { stations, getResultats, error } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [codeStation, setCodeStation] = useState<string>("");
  return (
    <Paper className={isUpSm ? classes.paperSm : classes.paperXs}>
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
      {error.noStation && (
        <p className={classes.noStation}>Pas de stations sur cette commune</p>
      )}
    </Paper>
  );
}
