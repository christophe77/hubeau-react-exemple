import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { FormControl } from "@mui/material";
import { Parametre } from "../types";

type RechercheProps = {
  commune: string;
  setCommune: (commune: string) => void;
  getUdiList: () => void;
  parametres: Parametre[];
  setParametres: (parametres: Parametre[]) => void;
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
  searchButton:{
    marginTop:"10px"
  }
}));
export default function Recherche(props: RechercheProps) {
  const { commune, setCommune, getUdiList, parametres, setParametres } = props;
  const classes = useStyles();

  const handleClick = (codeParametre: string, action: string) => {
    const parametresClone = [...parametres];
    const parametreIndex = parametresClone.findIndex(
      (parametre) => parametre.code_parametre === codeParametre
    );
    parametresClone[parametreIndex].selected = action === "ajouter";
    setParametres(parametresClone);
  };
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

          <div className={classes.chipsContainer}>
            {parametres &&
              parametres.length > 0 &&
              parametres.map((parametre) => {
                if (parametre.selected) {
                  return (
                    <Chip
                      className={classes.chip}
                      key={parametre.libelle_parametre}
                      label={parametre.libelle_parametre}
                      variant="outlined"
                      onDelete={() =>
                        handleClick(parametre.code_parametre, "supprimer")
                      }
                    />
                  );
                }
                return null;
              })}
          </div>

          <div className={classes.chipsContainer}>
            {parametres &&
              parametres.length > 0 &&
              parametres.map((parametre) => {
                if (!parametre.selected) {
                  return (
                    <Chip
                      className={classes.chip}
                      key={parametre.libelle_parametre}
                      label={parametre.libelle_parametre}
                      onClick={() =>
                        handleClick(parametre.code_parametre, "ajouter")
                      }
                    />
                  );
                }
                return null;
              })}
          </div>

          <Button
            variant="outlined"
            className={classes.searchButton}
            onClick={getUdiList}
          >
            Rechercher
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
}
