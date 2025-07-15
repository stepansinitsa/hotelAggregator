import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../store/store-hooks";
import { setUsersState } from "../../store/users/usersSlice";
import { SearchUsersDto } from "../../types/types.d";

function UsersSearchForm() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const searchParams: Partial<SearchUsersDto> = {
      offset: 0,
      email,
      name,
      contactPhone,
    };

    dispatch(setUsersState(searchParams));
  };

  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Form.Group className="mb-3" controlId="form-user-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите email частично"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-user-name">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите имя частично"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-user-phone">
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Введите телефон частично"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Поиск
      </Button>
    </Form>
  );
}

export default UsersSearchForm;