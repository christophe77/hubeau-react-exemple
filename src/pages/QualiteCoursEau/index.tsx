import React from "react";
import PageTitle from "../../common/PageTitle";
import Loading from "../../common/Loading";
import useQualiteCoursEau from "./useQualiteCoursEau";
import Recherche from "./Recherche";
import Stations from "./Stations";
import Resultats from "./Resultats";

export default function QualiteCoursEau() {
  const {
    error,
    commune,
    setCommune,
    isLoading,
    getStations,
    stations,
    getResultats,
    resultats,
    communes
  } = useQualiteCoursEau();

  return (
    <>
      <PageTitle path={"/qualite-cours-eau"} />
      <Recherche
        getStations={getStations}
        commune={commune}
        setCommune={setCommune}
        communes={communes}
      />
      {stations && (
        <Stations
          stations={stations}
          getResultats={getResultats}
          error={error}
        />
      )}
      {isLoading && <Loading />}
      {!isLoading && resultats && (
        <Resultats resultats={resultats} error={error} />
      )}
    </>
  );
}
