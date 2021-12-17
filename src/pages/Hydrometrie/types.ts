export type Station = {
  code_entite: string;
  nom_station: string;
};

export type Releve = {
  code_station: string;
  grandeur_hydro: string;
  date_obs: string;
  date_fin_serie:string;
  resultat_obs: string;
  longitude: number;
  latitude: number;
};
