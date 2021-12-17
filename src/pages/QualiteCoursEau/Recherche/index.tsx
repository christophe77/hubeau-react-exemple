import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

type RechercheProps = {
  commune: string;
  setCommune: (commune: string) => void;
  getResultats: () => void;
};
const useStyles = makeStyles(() => ({
  searchContainer: {
    display: "flex",
    alignItems: "center",
  },
  paper: {
    width: "100%",
    padding: "10px",
  },
  formControl: {
    width: "100%",
    padding: "10px",
  },
  chipsContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "5px",
    marginBottom: "5px",
  },
  chip: {
    marginTop: "5px",
    marginRight: "5px",
  },
  searchButton: {
    marginTop: "10px",
  },
}));
export default function Recherche(props: RechercheProps) {
  const { commune, setCommune, getResultats } = props;
  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
      <Paper className={classes.paper}>
        <FormControl className={classes.formControl}>
          <TextField
            id="commune"
            label="commune"
            value={commune}
            onChange={(event) => {
              setCommune(event.target.value);
            }}
            variant="outlined"
          />
          <Button
            variant="outlined"
            className={classes.searchButton}
            onClick={getResultats}
          >
            Rechercher
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
}