import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { resetPage } from "../pagination/pageSlice";
import { updateSearch } from "./searchSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearchChange = (e: any) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    if (localSearchQuery) {
      dispatch(resetPage());
      dispatch(updateSearch(localSearchQuery));
      navigate(`/search/${localSearchQuery}`);
    } 
  };
  return (
    <Form
      className="d-flex"
      onSubmit={handleSearchSubmit}
      style={{ fontSize: "2px" }}
    >
      <Form.Control
        type="search"
        style={{ width: "320px", fontSize: "18px" }}
        placeholder="Search Movies by their title"
        className="me-2"
        aria-label="Search"
        value={localSearchQuery}
        onChange={handleSearchChange}
      />
      <Button variant="secondary" type="submit">
        Search
      </Button>
    </Form>
  );
}
