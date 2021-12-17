import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
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
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
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
      <Paper style={{ padding: "10px" }}>
        <FormControl>
          <TextField
            id="commune"
            label="commune"
            value={commune}
            onChange={(event) => {
              setCommune(event.target.value);
            }}
            variant="outlined"
          />
          <br />
          <Stack direction="row" spacing={2}>
            {parametres &&
              parametres.length > 0 &&
              parametres.map((parametre) => {
                if (parametre.selected) {
                  return (
                    <Chip
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
          </Stack>
          <br />
          <Stack direction="row" spacing={2}>
            {parametres &&
              parametres.length > 0 &&
              parametres.map((parametre) => {
                if (!parametre.selected) {
                  return (
                    <Chip
                      label={parametre.libelle_parametre}
                      onClick={() =>
                        handleClick(parametre.code_parametre, "ajouter")
                      }
                    />
                  );
                }
                return null;
              })}
          </Stack>
          <br />
          <Button variant="outlined" onClick={getUdiList}>
            Rechercher
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
}
