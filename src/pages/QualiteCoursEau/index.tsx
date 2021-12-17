import React from "react";
import PageTitle from "../../common/PageTitle";
import Loading from "../../common/Loading";
import useQualiteCoursEau from "./useQualiteCoursEau";
import Recherche from "./Recherche";
import Resultats from "./Resultats";

export default function QualiteCoursEau() {
  const {
    commune,
    setCommune,
    isLoading,
    getResultats,
    resultats,
  } = useQualiteCoursEau();

  return (
    <>
      <PageTitle path={"/qualite-cours-eau"} />
      <Recherche
        getResultats={getResultats}
        commune={commune}
        setCommune={setCommune}
      />
      {isLoading && <Loading />}
      {!isLoading && resultats && resultats.length > 0 && (
        <Resultats resultats={resultats} />
      )}
    </>
  );
}
