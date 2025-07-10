import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { accommodationApi } from "../../../api/api-client";
import { useAppSelector } from "../../../store/store-hooks";

const AccommodationCreateForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<any>({});
  const navigate = useNavigate();
  const currentLodging = useAppSelector((state) => state.lodging.current);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 5 || name.length > 50) {
      iziToast.warning({
        message: "Название должно содержать от 5 до 50 символов",
        position: "bottomCenter",
      });
      return;
    }

    if (
      description.length > 0 &&
      (description.length < 100 || description.length > 5000)
    ) {
      iziToast.warning({
        message: "Описание должно быть от 100 до 5000 символов",
        position: "bottomCenter",
      });
      return;
    }

    if (Object.keys(images).length > 10) {
      iziToast.warning({
        message: "Можно загрузить максимум 10 изображений",
        position: "bottomCenter",
      });
      return;
    }

    let isImageValid = true;
    for (const key in images) {
      if (Object.prototype.hasOwnProperty.call(images, key)) {
        const image = images[key];
        if (!image.type.includes("image")) {
          isImageValid = false;
          break;
        }
      }
    }

    if (!isImageValid) {
      iziToast.warning({
        message: "Загружайте только изображения",
        position: "bottomCenter",
      });
      return;
    }

    const formData = new FormData();
    formData.append("lodgingId", currentLodging._id);
    formData.append("name", name);
    formData.append("description", description);
    for (const key in images) {
      if (Object.prototype.hasOwnProperty.call(images, key)) {
        const image = images[key];
        formData.append("images", image);
      }
    }

    try {
      const result = await accommodationApi.create(formData);
      iziToast.success({
        message: `Номер "${result.name}" успешно добавлен`,
        position: "bottomCenter",
      });

      navigate(-1);
    } catch (err) {
      iziToast.error({
        message: err.message || "Ошибка при создании аккомодации",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="form-accommodation-name">
        <Form.Label>Название</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите название аккомодации"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-accommodation-description">
        <Form.Label>Описание (необязательное поле)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={5000}
          placeholder="Введите описание аккомодации"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-accommodation-images">
        <Form.Label>Выберите изображения (максимум 10)</Form.Label>
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={(e: any) => setImages(e.target.files)}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Создать аккомодацию
      </Button>{" "}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  );
};

export default AccommodationCreateForm;