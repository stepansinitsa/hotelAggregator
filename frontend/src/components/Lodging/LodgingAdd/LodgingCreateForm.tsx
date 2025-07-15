import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../api/api-client";

function HotelsAddForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<any>(null);
  const { hotelsAPI } = useFetchData();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length < 5 || title.length > 50) {
      iziToast.warning({
        message: "Название должно быть от 5 до 50 символов",
        position: "bottomCenter",
      });
      return;
    }

    if (description.length > 0 && (description.length < 100 || description.length > 5000)) {
      iziToast.warning({
        message: "Описание должно содержать от 100 до 5000 символов",
        position: "bottomCenter",
      });
      return;
    }

    if (images && Object.keys(images).length > 10) {
      iziToast.warning({
        message: "Можно загрузить не более 10 изображений",
        position: "bottomCenter",
      });
      return;
    }

    const imageList = Array.from(images || []);
    const invalidImage = imageList.some((file: any) => !file.type.startsWith("image/"));

    if (invalidImage) {
      iziToast.warning({
        message: "Только изображения могут быть загружены",
        position: "bottomCenter",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (images) {
      for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
          formData.append("images", images[key]);
        }
      }
    }

    try {
      const result = await hotelsAPI.addHotel(formData);
      iziToast.success({
        message: `Гостиница ${result.data.title} успешно создана`,
        position: "bottomCenter",
      });

      navigate("/all-hotels");
    } catch (err: any) {
      iziToast.error({
        message: err?.response?.data?.message || "Ошибка при добавлении отеля",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} className="mt-3">
      <Form.Group className="mb-3" controlId="form-lodging-title">
        <Form.Label>Название отеля</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите название отеля"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-lodging-description">
        <Form.Label>Описание (до 5000 символов)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={5000}
          placeholder="Введите описание отеля"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-lodging-images">
        <Form.Label>Фотографии (максимум 10 шт.)</Form.Label>
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImages(e.target.files)
          }
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Создать отель
      </Button>{" "}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  );
}

export default HotelsAddForm;