import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { logoutUser } from "../api/registerUser";

export function Profile() {
  const { user, setLoggedIn } = useAuth();
  console.log("user: ", user);
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <h1>WELCOME HOME</h1>
      <footer>
        <button
          onClick={async (e) => {
            e.preventDefault();
            await logoutUser();
            setLoggedIn(false);
            navigate("/");
          }}
        >
          {" "}
          Logout
        </button>
      </footer>
    </div>
  );
}
