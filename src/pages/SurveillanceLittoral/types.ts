export type Station = {
  libelle_lieusurv: string;
  code_lieusurv: number;
  latitude: number;
  longitude: number;
  noms_taxons_suivis: string[];
};
export type StationData = {
  date_qualification_resultat: string;
  libelle_fraction: string;
  libelle_methode: string;
  libelle_unite_resultat: string;
  nom_organisme_analyste: string;
  resultat_analyse: string;
};
