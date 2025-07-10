import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../store/store-hooks";
import { searchLodging } from "../../../store/lodging/lodgingSlice";

const LodgingSearchForm = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchLodging({ title }));
  };

  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Form.Control
        type="text"
        placeholder="Название гостиницы"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3"
      />
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  );
};

export default LodgingSearchForm;