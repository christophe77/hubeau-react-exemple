import React from "react";
import Grid from "@mui/material/Grid";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import useSurveillanceLittoral from "./useSurveillanceLittoral";
import Loading from "../../common/Loading";
import PageTitle from "../../common/PageTitle";

export default function SurveillanceLittoral() {
  const { isLoading, stations } = useSurveillanceLittoral();
  const position: LatLngExpression =
    stations && stations.length > 0
      ? [stations[0].latitude, stations[0].longitude]
      : [0, 0];
  return (
    <>
      <PageTitle path={"/surveillance-littoral"} />
      <h3>Stations de surveillance de la rade de Brest</h3>

      {isLoading && <Loading />}
      <Grid container>
        <Grid item xs={12}>
          {!isLoading && stations && stations.length > 0 && (
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {stations.map((station) => (
                <Marker key={station.libelle_lieusurv} position={[station.latitude, station.longitude]}>
                  <Popup>
                    <h3>{station.libelle_lieusurv}</h3>
                    <ul>
                      {station.noms_taxons_suivis && station.noms_taxons_suivis.length > 0 &&
                        station.noms_taxons_suivis.map((taxon) => (
                          <li key={taxon}>{taxon}</li>
                        ))}
                    </ul>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
}
