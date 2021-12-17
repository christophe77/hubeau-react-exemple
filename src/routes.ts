import Accueil from "./pages/Accueil";
import QualiteEauPotable from "./pages/QualiteEauPotable";
import EauPotable from "./assets/images/eau-potable.svg";
import Goutte from "./assets/images/goutte.png";
const routes = [
  {
    key: 1,
    path: "/",
    exact: true,
    component: Accueil,
    title: "Accueil",
    image: Goutte,
  },
  {
    key: 2,
    path: "/qualite-eau-potable",
    exact: true,
    component: QualiteEauPotable,
    title: "Qualité eau potable",
    image: EauPotable,
  },
];

export default routes;
