import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { accommodationApi } from "../../../api/api-client";
import { useAppSelector } from "../../../store/store-hooks";

const AccommodationEditForm = () => {
  const currentAccommodation = useAppSelector((state) => state.accommodations.current);
  const [name, setName] = useState<string>(currentAccommodation.name || "");
  const [description, setDescription] = useState<string>(currentAccommodation.description || "");
  const [images, setImages] = useState<any>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
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
          message: "Описание должно содержать от 100 до 5000 символов",
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
      if (Object.keys(images).length > 0) {
        for (const key in images) {
          if (Object.prototype.hasOwnProperty.call(images, key)) {
            const image = images[key];
            if (!image.type.includes("image")) {
              isImageValid = false;
              break;
            }
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
      formData.append("name", name);
      formData.append("description", description);
      for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
          const image = images[key];
          formData.append("images", image);
        }
      }

      await accommodationApi.update(currentAccommodation._id, formData);
      iziToast.success({
        message: `Аккомодация "${name}" успешно обновлена`,
        position: "bottomCenter",
      });

      navigate(-1);
    } catch (error) {
      console.error(error);
      iziToast.error({
        message: "Ошибка при обновлении аккомодации",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Название</Form.Label>
        <Form.Control
          type="text"
          className="mb-3"
          placeholder="Введите название аккомодации"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Описание (необязательно, не более 5000 символов)
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          className="mb-3"
          maxLength={5000}
          placeholder="Введите описание аккомодации"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Выберите фотографии для загрузки (максимум 10)
        </Form.Label>
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={(e: any) => setImages(e.target.files)}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Сохранить изменения
      </Button>
      &nbsp;
      <Button variant="secondary" type="reset">
        Отмена
      </Button>
    </Form>
  );
};

export default AccommodationEditForm;