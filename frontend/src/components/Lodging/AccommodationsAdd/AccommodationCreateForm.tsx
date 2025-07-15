import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../api/api-client";
import { useAppSelector } from "../../../store/store-hooks";

function HotelRoomsAddForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<any>(null);
  const { roomsApi } = useFetchData();
  const navigate = useNavigate();
  const currentHotel = useAppSelector((state) => state.hotels.currentHotel);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length < 5 || title.length > 50) {
      iziToast.warning({
        message: "Название должно содержать от 5 до 50 символов",
        position: "bottomCenter",
      });
      return;
    }

    if (description.length > 0 && (description.length < 100 || description.length > 5000)) {
      iziToast.warning({
        message: "Описание должно быть от 100 до 5000 символов",
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

    const imageFiles = Array.from(images || []);
    const invalidImage = imageFiles.some(
      (file: any) => !file.type.startsWith("image/")
    );

    if (invalidImage) {
      iziToast.warning({
        message: "Только изображения могут быть загружены",
        position: "bottomCenter",
      });
      return;
    }

    const formData = new FormData();
    formData.append("hotel", currentHotel._id);
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
      const result = await roomsApi.addRoom(formData);
      iziToast.success({
        message: `Номер ${result.data.title} успешно создан`,
        position: "bottomCenter",
      });

      navigate(-1);
    } catch (err: any) {
      iziToast.error({
        message: err?.response?.data?.message || "Ошибка при создании номера",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} className="mb-4">
      <Form.Group className="mb-3" controlId="form-accommodation-title">
        <Form.Label>Название</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите название жилья"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-accommodation-description">
        <Form.Label>Описание (необязательно)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={5000}
          placeholder="Добавьте описание номера"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-accommodation-images">
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
        Создать
      </Button>{" "}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  );
}

export default HotelRoomsAddForm;