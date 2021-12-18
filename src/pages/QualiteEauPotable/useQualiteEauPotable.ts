import { useState } from "react";
import { qualiteEauPotable } from "hubeau-api";
import { Udi, Resultat, Parametre } from "./types";
import { currentYear } from "../../utils";
import codesParametres from "./codesParametres";

const useQualiteEauPotable = () => {
  const [commune, setCommune] = useState<string>("");
  const [udiList, setUdilist] = useState<Udi[]>([]);
  const [resultats, setResultats] = useState<Resultat[]>([]);
  const [searchIsLoading, setSearchIsLoading] = useState<boolean>(false);
  const [resultIsLoading, setResultIsLoading] = useState<boolean>(false);
  const [parametres, setParametres] = useState<Parametre[]>(codesParametres);

  async function getUdiList() {
    setSearchIsLoading(true);
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
        setUdilist([]);
        setSearchIsLoading(false);
        throw new Error("");
      }
    }
    setSearchIsLoading(false);
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
      setResultIsLoading(true);
      const code_parametre: string[] = [];
      parametres.forEach((code) => {
        if (code.selected) {
          code_parametre.push(code.code_parametre);
        }
      });
      const params = {
        nom_commune: [commune],
        code_reseau: [udi.code_reseau],
        nom_quartier: [udi.nom_quartier],
        nom_reseau: [udi.nom_reseau],
        code_parametre,
        size: 10,
      };
      try {
        const results = await qualiteEauPotable.resultatsDis(params);
        setResultats(results.data);
      } catch {
        setResultats([]);
        setResultIsLoading(false);
        throw new Error("");
      }
      const uiUdiList = udiListClone.map((udi, i) => {
        return udiIndexInList === i
          ? { ...udi, open: true }
          : { ...udi, open: false };
      });
      setUdilist(uiUdiList);
      setResultIsLoading(false);
    }
  }
  return {
    commune,
    setCommune,
    udiList,
    getUdiList,
    getResultats,
    resultats,
    searchIsLoading,
    resultIsLoading,
    parametres,
    setParametres,
  };
};
export default useQualiteEauPotable;
