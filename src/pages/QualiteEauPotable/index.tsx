import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import useQualiteEauPotable from "./useQualiteEauPotable";
import Resultats from "./Resultats/Resultats";

export default function QualiteEauPotable() {
  const {
    commune,
    setCommune,
    getUdiList,
    udiList,
    isLoading,
    getResultats,
    resultats,
  } = useQualiteEauPotable();

  return (
    <div>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="commune"
          label="commune"
          value={commune}
          onChange={(event) => {
            setCommune(event.target.value);
          }}
          variant="outlined"
        />
        <Button variant="outlined" onClick={getUdiList}>
          Valider
        </Button>
      </Box>
      {isLoading && <CircularProgress />}
      {!isLoading && udiList && udiList.length > 0 && (
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="udi-subheader"
          subheader={
            <ListSubheader component="div" id="udi-subheader">
              Unités de distribution
            </ListSubheader>
          }
        >
          {udiList.map((udi) => {
            return (
              <Fragment key={udi.code_reseau}>
                <ListItemButton
                  onClick={() => {
                    getResultats(udi);
                  }}
                >
                  <ListItemText
                    primary={`${udi.nom_quartier.toUpperCase()}-${
                      udi.nom_reseau
                    }`}
                  />
                  {udi.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={udi.open} timeout="auto" unmountOnExit>
                  <Resultats resultats={resultats} isLoading={isLoading}/>
                </Collapse>
              </Fragment>
            );
          })}
        </List>
      )}
    </div>
  );
}
