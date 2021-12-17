import { useState } from "react";
import { qualiteRivieres } from "hubeau-api";
import { Resultat } from "./types";
import { Sort } from "hubeau-api/dist/esm/types/communs";

const useQualiteCoursEau = () => {
  const [commune, setCommune] = useState<string>("");
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getResultats() {
    setIsLoading(true);
    const sort: Sort = "desc";
    const params = {
      nom_commune: [commune],
      size: 15,
      page: 1,
      sort,
    };

    try {
      const results = await qualiteRivieres.conditionEnvironnementalePc(params);
      setResultats(results.data.slice(0, 15));
    } catch {
      setIsLoading(false);
      throw new Error("");
    }

    setIsLoading(false);
  }
  return {
    commune,
    setCommune,
    getResultats,
    resultats,
    isLoading,
  };
};
export default useQualiteCoursEau;
