import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Station } from "../types";

type StationsProps = {
  stations: Station[];
  getResultats: (codeStation: string) => void;
};
export default function Stations(props: StationsProps) {
  const { stations, getResultats } = props;
  const [codeStation, setCodeStation] = useState<string>("");
  return (
    <Fragment>
      {stations?.length > 0 && (
        <ButtonGroup
          style={{ maxWidth: "100%" }}
          variant="contained"
          aria-label="outlined primary button group"
        >
          {stations.map((station) => {
            return (
              <Button
                color={
                  station.code_station === codeStation ? "secondary" : "primary"
                }
                key={station.code_station}
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
    </Fragment>
  );
}
