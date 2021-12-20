import { useEffect, useState } from "react";
import { surveillanceLittoral } from "hubeau-api";
import { Station, StationData } from "./types";

export default function useSurveillanceLittoral() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [currentStation, setCurrentStation] = useState<string>("");
  const [stationDatas, setStationDatas] = useState<StationData[]>();

  async function getStations() {
    setIsLoading(true);
    const params = {
      codes_masses_eau: ["FRGC16"],
      donnees_cc: true,
    };
    try {
      const results = await surveillanceLittoral.lieuxSurv(params);
      setStations(results.data);
    } catch {
      setStations([]);
      setIsLoading(false);
      throw new Error("");
    }
    setIsLoading(false);
  }

  async function getStationDatas(codeLieuSurv: number) {
    const defaultResult: StationData = {
      date_qualification_resultat: "",
      libelle_fraction: "",
      libelle_methode: "",
      libelle_unite_resultat: "",
      nom_organisme_analyste: "Aucune analyse disponible",
      resultat_analyse: "",
    };
    const params = {
      code_lieusurv: [codeLieuSurv],
      date_min_qualification: "2000-01-01",
      size: 20,
    };
    try {
      const results = await surveillanceLittoral.contaminantsChimiques(params);

      setStationDatas(results.data.length > 0 ? results.data : [defaultResult]);
    } catch {
      setStationDatas([defaultResult]);
      throw new Error("");
    }
  }

  useEffect(() => {
    getStations();
  }, []);

  return {
    isLoading,
    stations,
    getStationDatas,
    stationDatas,
    setCurrentStation,
    currentStation
  };
}
