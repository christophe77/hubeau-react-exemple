import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Tableau from "./Tableau";
import Cartes from "./Cartes";
import { QceError, Resultat } from "../types";

type ResultatsProps = {
  resultats: Resultat[];
  error: QceError;
};
export default function Resultats(props: ResultatsProps) {
  const { error } = props;
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      {isUpSm ? <Tableau {...props} /> : <Cartes {...props} />}
      {error.noResults && (
        <p style={{textAlign:"center"}}>Pas de résultats pour cette station</p>
      )}
    </>
  );
}
