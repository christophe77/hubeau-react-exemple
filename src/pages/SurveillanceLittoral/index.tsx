import React from "react";
import Grid from "@mui/material/Grid";
import { Info } from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import useSurveillanceLittoral from "./useSurveillanceLittoral";
import { convertDate } from "../../utils";
import Loading from "../../common/Loading";
import PageTitle from "../../common/PageTitle";

export default function SurveillanceLittoral() {
  const {
    isLoading,
    stations,
    stationDatas,
    getStationDatas,
    currentStation,
    setCurrentStation,
  } = useSurveillanceLittoral();

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
                <Marker
                  key={station.libelle_lieusurv}
                  position={[station.latitude, station.longitude]}
                >
                  <Popup>
                    <div
                      onClick={() => {
                        setCurrentStation(station.libelle_lieusurv);
                        getStationDatas(station.code_lieusurv);
                      }}
                    >
                      <h3>{station.libelle_lieusurv}</h3>
                      <ul>
                        {station.noms_taxons_suivis &&
                          station.noms_taxons_suivis.length > 0 &&
                          station.noms_taxons_suivis.map((taxon) => (
                            <li key={taxon}>{taxon}</li>
                          ))}
                      </ul>
                      <p style={{ textAlign: "center", cursor: "pointer" }}>
                        <Info color="success" sx={{ fontSize: 40 }} />
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </Grid>
        {stationDatas && stationDatas.length > 0 && (
          <Grid item xs={12}>
            <h4>Derniers relevés</h4>
            <h5>{currentStation}</h5>
            {stationDatas.map((stationData, i) => (
              <div key={i}>
                <b>{stationData.nom_organisme_analyste}</b>
                <br />
                <i>
                  {stationData.date_qualification_resultat !== "" &&
                    convertDate(stationData.date_qualification_resultat)}
                </i>
                <br />
                {stationData.libelle_methode}
                <br />
                {stationData.libelle_fraction}
                <br />
                {stationData.resultat_analyse}
                {stationData.libelle_unite_resultat
                  .replace("pourcentage", "%")
                  .replace("millimètre", "mm")
                  .replace("milligramme par kilogramme", "mg/kg")
                  .replace("microgramme par kilogramme", "μg/kg")}
                <hr />
              </div>
            ))}
          </Grid>
        )}
      </Grid>
    </>
  );
}
