import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Spinner } from "reactstrap";
import "./App.css";
import ROUTES from "./Routes/routes";
import "./Styles/shared.scss";

function App() {
  const element = useRoutes(ROUTES);

  return (
    <Suspense
      fallback={
        <div className="align-page-center">
          <Spinner />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export default App;
