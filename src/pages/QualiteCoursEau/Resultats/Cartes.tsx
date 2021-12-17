import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { convertDate } from "../../../utils";
import { Resultat } from "../types";

type CartesProps = {
  resultats: Resultat[];
};
export default function Cartes(props: CartesProps) {
  const { resultats } = props;
  return (
    <>
      {resultats.map((resultat: Resultat) => (
        <Card
          sx={{ minWidth: 275 }}
          key={`${resultat.code_parametre}-${resultat.date_prelevement}`}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {convertDate(resultat.date_prelevement)}
            </Typography>
            <Typography variant="h4" component="div">
              {resultat.libelle_station}
            </Typography>
            <Typography variant="h5" component="div">
              {resultat.libelle_parametre}
            </Typography>
            <Typography variant="body2">
              {resultat.mnemo_remarque}
            </Typography>
            <Typography variant="body2">
              {resultat.libelle_qualification}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
