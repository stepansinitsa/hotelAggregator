import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../store/store-hooks";
import { setHotelsState } from "../../../store/lodgings/lodgingSlice";

function HotelsSearchForm() {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setHotelsState({ offset: 0, titleSearch: title }));
  };

  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Введите текст для поиска..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Поиск
      </Button>
    </Form>
  );
}

export default HotelsSearchForm;