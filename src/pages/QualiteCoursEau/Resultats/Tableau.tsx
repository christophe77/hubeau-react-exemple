import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import makeStyles from "@mui/styles/makeStyles";
import { convertDate } from "../../../utils";
import { Resultat } from "../types";

const useStyles = makeStyles(() => ({
  paper: {
    width: "100%",
  },
}));

type TableauProps = {
  resultats: Resultat[];
};
export default function Tableau(props: TableauProps) {
  const { resultats } = props;
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table sx={{ minWidth: 650 }} aria-label="prel-resultats">
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
            <TableCell align="center">
              <b>Qualification</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultats.map((resultat: Resultat, i: number) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {convertDate(resultat.date_prelevement)}
              </TableCell>
              <TableCell align="center">{resultat.libelle_parametre}</TableCell>
              <TableCell align="center">{resultat.resultat}
              {resultat.symbole_unite !== "X" && resultat.symbole_unite}</TableCell>
              <TableCell align="center">
                {resultat.libelle_qualification}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
