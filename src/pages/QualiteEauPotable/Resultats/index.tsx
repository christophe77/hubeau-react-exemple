import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { convertDate } from "../../../utils";
import { Resultat } from "../types";

type ResultatsProps = {
  resultats: Resultat[];
  resultIsLoading: boolean;
};
export default function Resultats(props: ResultatsProps) {
  const { resultats, resultIsLoading } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="udi-resultats">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Date</b>
            </TableCell>
            <TableCell align="center">
              <b>Paramètre</b>
            </TableCell>
            <TableCell align="center">
              <b>Résultat</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultIsLoading && <CircularProgress color="info" />}
          {!resultIsLoading &&
            resultats &&
            resultats.length > 0 &&
            resultats.map((resultat: Resultat) => (
              <TableRow
                key={resultat.libelle_parametre}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {convertDate(resultat.date_prelevement)}
                </TableCell>
                <TableCell align="center">
                  {resultat.code_parametre} {resultat.libelle_parametre}
                </TableCell>
                <TableCell align="center">
                  {resultat.conclusion_conformite_prelevement}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
