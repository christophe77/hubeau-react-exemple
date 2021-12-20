import { useEffect, useState } from "react";
import { surveillanceLittoral } from "hubeau-api";
import { Station } from "./types";

export default function useSurveillanceLittoral() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stations, setStations] = useState<Station[]>([]);

  async function getStations() {
    setIsLoading(true);
    const params = {
      codes_masses_eau: ["FRGC16"],
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
  useEffect(() => {
    getStations();
  }, []);

  return {
    isLoading,
    stations,
  };
}
