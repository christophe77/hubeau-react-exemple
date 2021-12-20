import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import NativeSelect from "@mui/material/NativeSelect";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import useHydrometrie from "./useHydrometrie";
import { convertDateTime } from "../../utils";
import Loading from "../../common/Loading";
import PageTitle from "../../common/PageTitle";

export default function Hydrometrie() {
  const { isLoading, stations, relevesH, relevesQ, getRelevesHydro } =
    useHydrometrie();
  const position: LatLngExpression =
    relevesH && relevesH[0] && relevesH[0].latitude
      ? [relevesH[0].latitude, relevesH[0].longitude]
      : [0, 0];
  return (
    <>
      <PageTitle path={"/hydrometrie"} />
      <h3>Stations hydrométriques de la Loire</h3>
      <FormControl fullWidth style={{marginBottom:"15px"}}>
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
      <br />
      {isLoading && <Loading />}
      <Grid container>
        <Grid item xs={12}>
          {!isLoading && relevesH.length > 0 && relevesQ.length > 0 && (
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  {convertDateTime(relevesH[0].date_obs)} <br />
                  Hauteur (m) : {Number(relevesH[0].resultat_obs) / 10000}
                  <br /><br />
                  {convertDateTime(relevesQ[0].date_obs)} <br />
                  Débit (m³/s) : {relevesQ[0].resultat_obs}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </Grid>
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
