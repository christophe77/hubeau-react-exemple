export type Udi = {
  code_reseau: string;
  nom_quartier: string;
  nom_reseau: string;
  code_parametre: string[];
  open: boolean;
};
export type Resultat = {
  libelle_parametre: string;
  conclusion_conformite_prelevement: string;
  date_prelevement: string;
  code_parametre: string;
};
export type Parametre = {
  code_parametre: string;
  libelle_parametre: string;
  selected: boolean;
};
