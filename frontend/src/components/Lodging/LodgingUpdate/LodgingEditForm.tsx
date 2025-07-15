import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../api/api-client";
import { useAppSelector } from "../../../store/store-hooks";

function HotelsUpdateForm() {
  const currentHotel = useAppSelector((state) => state.hotels.currentHotel);
  const [title, setTitle] = useState<string>(currentHotel.title);
  const [description, setDescription] = useState<string>(currentHotel.description || "");
  const [images, setImages] = useState<any>(null);
  const { hotelsAPI } = useFetchData();
  const navigate = useNavigate();

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

    const imageList = Array.from(images || []);
    if (imageList.length > 10) {
      iziToast.warning({
        message: "Можно загрузить не более 10 изображений",
        position: "bottomCenter",
      });
      return;
    }

    const hasInvalidType = imageList.some((file: any) => !file.type.startsWith("image/"));

    if (hasInvalidType) {
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
      await hotelsAPI.updateHotel(formData, currentHotel._id);
      iziToast.success({
        message: `Гостиница ${title} успешно обновлена`,
        position: "bottomCenter",
      });

      navigate("/all-hotels");
    } catch (err: any) {
      iziToast.error({
        message: err?.response?.data?.message || "Ошибка при обновлении отеля",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} className="mb-4">
      <Form.Group className="mb-3" controlId="form-lodging-title">
        <Form.Label>Название отеля</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите новое название"
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

      <Button variant="primary" type="submit">
        Сохранить изменения
      </Button>{" "}
      <Button variant="secondary" type="reset">
        Сбросить
      </Button>
    </Form>
  );
}

export default HotelsUpdateForm;