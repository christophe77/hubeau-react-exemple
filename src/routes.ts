import Accueil from "./pages/Accueil";
import QualiteEauPotable from "./pages/QualiteEauPotable";
import QualiteEauPotableLogo from "./assets/images/eau-potable.svg";
import QualiteCoursEau from "./pages/QualiteCoursEau";
import QualiteCoursEauLogo from "./assets/images/quality.svg";
import Goutte from "./assets/images/goutte.png";
import HydrometrieLogo from "./assets/images/hydrometry.svg";
import Hydrometrie from "./pages/Hydrometrie";
import SurveillanceLittoral from "./pages/SurveillanceLittoral";
import SurveillanceLittoralLogo from "./assets/images/surv-lit.svg";

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
    image: QualiteEauPotableLogo,
  },
  {
    key: 3,
    path: "/hydrometrie",
    exact: true,
    component: Hydrometrie,
    title: "Hydrométrie",
    image: HydrometrieLogo,
  },
  {
    key: 4,
    path: "/qualite-cours-eau",
    exact: true,
    component: QualiteCoursEau,
    title: "Qualité cours d'eau",
    image: QualiteCoursEauLogo,
  },
  {
    key: 5,
    path: "/surveillance-littoral",
    exact: true,
    component: SurveillanceLittoral,
    title: "Surveillance littoral",
    image: SurveillanceLittoralLogo,
  },
];

export default routes;
