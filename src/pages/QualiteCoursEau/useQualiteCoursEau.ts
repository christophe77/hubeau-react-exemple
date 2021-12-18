import { useState } from "react";
import { qualiteRivieres } from "hubeau-api";
import { QceError, Resultat, Station } from "./types";
import { Sort } from "hubeau-api/dist/esm/types/communs";

const useQualiteCoursEau = () => {
  const [commune, setCommune] = useState<string>("");
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<QceError>({
    noStation: false,
    noResults: false,
  });
  const sort: Sort = "desc";

  async function getStations() {
    setIsLoading(true);
    setResultats([]);
    const params = {
      libelle_commune: [commune],
      fields: ["code_station", "nom_cours_eau", "libelle_station"],
      sort,
    };
    if (commune.length > 0) {
      try {
        const results = await qualiteRivieres.stationPc(params);
        setError({
          ...error,
          noStation: results.data.length === 0,
          noResults: false,
        });
        setStations(results.data);
      } catch {
        setStations([]);
        setIsLoading(false);
        throw new Error("");
      }
    }
    setIsLoading(false);
  }

  async function getResultats(codeStation: string) {
    setIsLoading(true);
    const params = {
      code_station: [codeStation],
      size: 15,
      page: 1,
      sort,
    };
    try {
      const results = await qualiteRivieres.conditionEnvironnementalePc(params);
      setError({ ...error, noResults: results.data.length === 0 });
      setResultats(results.data.slice(0, 15));
    } catch {
      setResultats([]);
      setIsLoading(false);
      throw new Error("");
    }
    setIsLoading(false);
  }
  return {
    error,
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
