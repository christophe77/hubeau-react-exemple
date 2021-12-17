import { Link } from "react-router-dom";
import routes from "../../routes";

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
        {routes &&
          routes.map((route) => {
            return (
              <li key={route.key}>
                <Link to={route.path}>{route.title}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
