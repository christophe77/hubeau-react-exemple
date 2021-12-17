import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Tableau from "./Tableau";
import Cartes from "./Cartes";
import { Resultat } from "../types";

type ResultatsProps = {
  resultats: Resultat[];
  resultIsLoading: boolean;
};
export default function Resultats(props: ResultatsProps) {
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  return <>{isUpSm ? <Tableau {...props} /> : <Cartes {...props} />}</>;
}
