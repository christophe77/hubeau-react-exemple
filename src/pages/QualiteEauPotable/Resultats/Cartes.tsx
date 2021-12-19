import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { convertDate } from "../../../utils";
import Loading from "../../../common/Loading";
import { Resultat } from "../types";

type CartesProps = {
  resultats: Resultat[];
  resultIsLoading: boolean;
};
export default function Cartes(props: CartesProps) {
  const { resultats, resultIsLoading } = props;
  return (
    <>
      {resultIsLoading && <Loading />}

      {!resultIsLoading &&
        resultats &&
        resultats.length > 0 &&
        resultats.map((resultat: Resultat) => (
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
              <Typography variant="body1" component="div">
                {resultat.libelle_parametre}
              </Typography>
              <Typography variant="body1" component="div">
                {resultat.resultat_alphanumerique}&nbsp;
                {resultat.libelle_unite !== "SANS OBJET" &&
                  resultat.libelle_unite}
              </Typography>
              <Typography variant="body2">
                {resultat.conclusion_conformite_prelevement}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
