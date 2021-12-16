import { useState } from "react";
import { qualiteEauPotable } from "hubeau-api";
import { Udi, Resultat } from "./types";
import { currentYear } from "../../utils";

const useQualiteEauPotable = () => {
  const [commune, setCommune] = useState<string>("");
  const [udiList, setUdilist] = useState<Udi[]>([]);
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getUdiList() {
    setIsLoading(true);
    const params = {
      nom_commune: [commune],
      annee: [currentYear],
      fields: ["code_reseau", "nom_quartier", "nom_reseau"],
    };
    if (commune && commune !== "") {
      try {
        const results = await qualiteEauPotable.communesUdi(params);
        const uiUdiList = results.data.map((udi: Udi) => {
          return { ...udi, open: false };
        });
        setUdilist(uiUdiList);
      } catch {
        setIsLoading(false);
        throw new Error("");
      }
    }
    setIsLoading(false);
  }
  async function getResultats(udi: Udi) {
    const udiIndexInList = udiList.findIndex(
      (udiFromList) => udiFromList.code_reseau === udi.code_reseau
    );
    const udiListClone = [...udiList];
    if (udi.open) {
      udiListClone[udiIndexInList].open = false;
      setUdilist(udiListClone);
    } else {
      setIsLoading(true);
      const params = {
        nom_commune: [commune],
        code_reseau: [udi.code_reseau],
        nom_quartier: [udi.nom_quartier],
        nom_reseau: [udi.nom_reseau],
        size: 10,
      };
      try {
        const results = await qualiteEauPotable.resultatsDis(params);
        setResultats(results.data);
      } catch {
        setIsLoading(false);
        throw new Error("");
      }
      udiListClone[udiIndexInList].open = true;
      setUdilist(udiListClone);
      setIsLoading(false);
    }
  }

  return {
    commune,
    setCommune,
    udiList,
    getUdiList,
    getResultats,
    resultats,
    isLoading,
  };
};
export default useQualiteEauPotable;
