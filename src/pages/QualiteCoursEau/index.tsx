import React from "react";
import PageTitle from "../../common/PageTitle";
import Loading from "../../common/Loading";
import useQualiteCoursEau from "./useQualiteCoursEau";
import Recherche from "./Recherche";
import Stations from "./Stations";
import Resultats from "./Resultats";

export default function QualiteCoursEau() {
  const {
    commune,
    setCommune,
    isLoading,
    getStations,
    stations,
    getResultats,
    resultats,
  } = useQualiteCoursEau();

  return (
    <>
      <PageTitle path={"/qualite-cours-eau"} />
      <Recherche
        getStations={getStations}
        commune={commune}
        setCommune={setCommune}
      />
      {stations?.length > 0 && (
        <Stations stations={stations} getResultats={getResultats} />
      )}
      {isLoading && <Loading />}
      {!isLoading && resultats?.length > 0 && (
        <Resultats resultats={resultats} />
      )}
    </>
  );
}
