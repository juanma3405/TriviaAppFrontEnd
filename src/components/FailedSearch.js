import { useNavigate } from "react-router-dom";

export default function FailedSearch() {
  const navigate = useNavigate();
  const goToSelections = () => {
    navigate("/selections");
  };
  return (
    <div className="home-container">
      <h1 className="home-text">
        {" "}
        SORRY WE DON´T HAVE QUESTIONS FOR THAT CONFIGURATION. PICK ANOTHER
        OPTIONS PLEASE{" "}
      </h1>
      <button onClick={goToSelections} className="btn-play">
        GO TO SELECTIONS{" "}
      </button>
    </div>
  );
}
