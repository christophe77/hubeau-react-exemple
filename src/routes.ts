import Accueil from "./pages/Accueil";
import QualiteEauPotableLogo from "./pages/QualiteEauPotable";
import EauPotable from "./assets/images/eau-potable.svg";
import Goutte from "./assets/images/goutte.png";
import HydrometrieLogo from "./assets/images/hydrometry.svg";
import Hydrometrie from "./pages/Hydrometrie";
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
    component: QualiteEauPotableLogo,
    title: "Qualité eau potable",
    image: EauPotable,
  },
  {
    key: 3,
    path: "/hydrometrie",
    exact: true,
    component: Hydrometrie,
    title: "Hydrométrie",
    image: HydrometrieLogo,
  },
];

export default routes;
