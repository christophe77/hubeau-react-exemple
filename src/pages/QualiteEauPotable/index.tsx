import React, { Fragment } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import PageTitle from "../../common/PageTitle";
import useQualiteEauPotable from "./useQualiteEauPotable";
import Recherche from "./Recherche";
import Resultats from "./Resultats";

export default function QualiteEauPotable() {
  const {
    commune,
    setCommune,
    getUdiList,
    udiList,
    searchIsLoading,
    resultIsLoading,
    getResultats,
    resultats,
    parametres,
    setParametres,
  } = useQualiteEauPotable();

  return (
    <>
      <PageTitle path={"/qualite-eau-potable"} />
      <Recherche
        commune={commune}
        setCommune={setCommune}
        getUdiList={getUdiList}
        parametres={parametres}
        setParametres={setParametres}
      />
      {searchIsLoading && <CircularProgress />}
      {!searchIsLoading && udiList && udiList.length > 0 && (
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
                  <Resultats
                    resultats={resultats}
                    resultIsLoading={resultIsLoading}
                  />
                </Collapse>
              </Fragment>
            );
          })}
        </List>
      )}
    </>
  );
}
