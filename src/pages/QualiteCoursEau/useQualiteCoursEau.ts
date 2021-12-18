import { useState } from "react";
import { qualiteRivieres } from "hubeau-api";
import { Resultat, Station } from "./types";
import { Sort } from "hubeau-api/dist/esm/types/communs";

const useQualiteCoursEau = () => {
  const [commune, setCommune] = useState<string>("");
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sort: Sort = "desc";

  async function getStations() {
    setIsLoading(true);
    const params = {
      libelle_commune: [commune],
      fields: ["code_station", "nom_cours_eau", "libelle_station"],
      sort,
    };
    try {
      const results = await qualiteRivieres.stationPc(params);
      setStations(results.data);
    } catch {
      setStations([]);
      setIsLoading(false);
      throw new Error("");
    }
    setIsLoading(false);
  }

  async function getResultats(codeStation:string) {
    setIsLoading(true);
    const params = {
      code_station: [codeStation],
      size: 15,
      page: 1,
      sort,
    };

    try {
      const results = await qualiteRivieres.conditionEnvironnementalePc(params);
      setResultats(results.data.slice(0, 15));
    } catch {
      setResultats([]);
      setIsLoading(false);
      throw new Error("");
    }

    setIsLoading(false);
  }
  return {
    commune,
    setCommune,
    stations,
    getResultats,
    getStations,
    resultats,
    isLoading,
  };
};
export default useQualiteCoursEau;
