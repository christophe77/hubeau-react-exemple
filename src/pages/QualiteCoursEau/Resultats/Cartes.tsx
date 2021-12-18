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
      {resultats.map((resultat: Resultat, i: number) => (
        <Card sx={{ minWidth: 275 }} key={i}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {convertDate(resultat.date_prelevement)}
            </Typography>
            <Typography variant="body1" component="div">
              {resultat.libelle_parametre}
            </Typography>
            <Typography variant="body2">
              {resultat.resultat}
              {resultat.symbole_unite !== "X" && resultat.symbole_unite}
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
