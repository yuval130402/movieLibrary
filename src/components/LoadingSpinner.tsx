import Spinner from "react-bootstrap/Spinner";

export const LoadingSpinner = () => {
  return (
    <Spinner animation="border" role="status" variant="light">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}
