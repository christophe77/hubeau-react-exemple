import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import NativeSelect from "@mui/material/NativeSelect";
import useHydrometrie from "./useHydrometrie";
import { convertDateTime } from "../../utils";
import Loading from "../../common/Loading";
import PageTitle from "../../common/PageTitle";

export default function Hydrometrie() {
  const { isLoading, stations, relevesH, relevesQ, getRelevesHydro } =
    useHydrometrie();
  return (
    <>
      <PageTitle path={"/hydrometrie"} />
      <h3>Stations hydrométriques de la Loire</h3>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-station">
          Station
        </InputLabel>
        <NativeSelect
          onChange={(event) => {
            getRelevesHydro(event.target.value, "H");
            getRelevesHydro(event.target.value, "Q");
          }}
          defaultValue={30}
          inputProps={{
            name: "station",
            id: "uncontrolled-station",
          }}
        >
          {stations &&
            stations.map((station) => {
              return (
                <option key={station.code_entite} value={station.code_entite}>
                  {station.nom_station}
                </option>
              );
            })}
        </NativeSelect>
      </FormControl>
      {isLoading && <Loading />}
      <Grid container>
        <Grid item xs={12} sm={6}>
          <h4>Hauteur (m)</h4>
          {!isLoading &&
            relevesH.length > 0 &&
            relevesH.map((releve, indexReleve) => {
              return (
                <p key={indexReleve}>
                  {convertDateTime(releve.date_obs)} :{" "}
                  {Number(releve.resultat_obs) / 10000}
                </p>
              );
            })}
        </Grid>
        <Grid item xs={12} md={6}>
          <h4>Débit (m³/s)</h4>
          {!isLoading &&
            relevesQ.length > 0 &&
            relevesQ.map((releve, indexReleve) => {
              return releve.grandeur_hydro === "Q" ? (
                <p key={indexReleve}>
                  {convertDateTime(releve.date_obs)} : {releve.resultat_obs}
                </p>
              ) : null;
            })}
        </Grid>
      </Grid>
    </>
  );
}
