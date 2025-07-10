import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../store/store-hooks";
import { searchUserAccounts } from "../../store/users/userAccountSlice";

const UserAccountSearchForm = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchUserAccounts({ email, name, phone, offset: 0 }));
  };

  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Form.Control
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2"
      />
      <Form.Control
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2"
      />
      <Form.Control
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-2"
      />
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  );
};

export default UserAccountSearchForm;