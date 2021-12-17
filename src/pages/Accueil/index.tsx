import { Link } from "react-router-dom";

export default function Accueil() {
  return (
    <>
      <h2>
        Demo utilisation du package{" "}
        <a
          href="https://www.npmjs.com/package/hubeau-api"
          target="_blank"
          rel="noreferrer"
        >
          hubeau-api
        </a>
      </h2>
      <ul>
        <li>
          <Link to="/qualite-eau-potable">Qualité eau potable</Link>
        </li>
      </ul>
    </>
  );
}
