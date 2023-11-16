import { Link } from "react-router-dom";

export default function Error({ error }) {
  return (
    <div>
      <h3>404</h3>
      <h2>Page not found</h2>
      <p>
        Go to page <Link to="/albums">Albums</Link>
      </p>
    </div>
  );
}
