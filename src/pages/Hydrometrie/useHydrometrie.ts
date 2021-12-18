import { useEffect, useState } from "react";
import { hydrometrie } from "hubeau-api";
import { Releve } from "./types";
import stations from "./stations";
import { Sort } from "hubeau-api/dist/esm/types/communs";

export default function useHydrometrie() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [relevesH, setRelevesH] = useState<Releve[]>([]);
  const [relevesQ, setRelevesQ] = useState<Releve[]>([]);

  async function getRelevesHydro(code_entite: string, grandeur_hydro: string) {
    setIsLoading(true);
    const sort: Sort = "desc";
    const params = {
      code_entite: [code_entite],
      grandeur_hydro,
      size: 5,
      sort,
    };
    try {
      const results = await hydrometrie.observationsTr(params);
      if (grandeur_hydro === "H") {
        setRelevesH(results.data);
      } else {
        setRelevesQ(results.data);
      }
    } catch {
      setRelevesH([]);
      setRelevesQ([]);
      setIsLoading(false);
      throw new Error("");
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getRelevesHydro(stations[0].code_entite, "H");
    getRelevesHydro(stations[0].code_entite, "Q");
  }, []);

  return {
    isLoading,
    stations,
    setIsLoading,
    relevesH,
    relevesQ,
    getRelevesHydro,
  };
}
