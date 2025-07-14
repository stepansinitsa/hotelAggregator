import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../../api/api-client";
import { useAppSelector } from "../../../store/store-hooks";

function HotelRoomUpdateForm() {
  const currentRoom = useAppSelector(state => state.rooms.currentRoom);
  const [title, setTitle] = useState<string>(currentRoom.title);
  const [description, setDescription] = useState<string>(currentRoom.description);
  const [images, setImages] = useState<any>();
  const { roomsApi } = useFetchData();
  const navigate = useNavigate();
  

  const formHandler = async (e: any) => {
    try {
      e.preventDefault();

      if (title.length < 5 && title.length > 50) {
        iziToast.warning({
          message: 'Название жилья должно содержать от 5 до 50 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      if (description.length > 0 && (description.length < 100 || description.length > 5000)) {
        iziToast.warning({
          message: 'Описание жилья должно содержать от 100 до 5000 символов!',
          position: 'bottomCenter',
        });
        return;
      }

      if (Object.keys(images).length > 10) {
        iziToast.warning({
          message: 'Максимально можно загрузить до 10 картинок!',
          position: 'bottomCenter',
        });
        return;
      }

      let isExtValid = true;
      if (Object.keys(images).length > 0) {
        for (const key in images) {
          if (Object.prototype.hasOwnProperty.call(images, key)) {
            const image = images[key];
            if (!image.type.includes('image')) {
              isExtValid = false;
              break;
            }
          }
        }
      }
      
      if (!isExtValid) {
        iziToast.warning({
          message: 'Можно загружать только картинки!',
          position: 'bottomCenter',
        });
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      for (const key in images) {
        if (Object.prototype.hasOwnProperty.call(images, key)) {
          const image = images[key];
          formData.append('images', image);
        }
      }

      roomsApi.updateRoom(formData, currentRoom._id)
        .then(result => {
          iziToast.success({
            message: `Номер ${result.data.title} успешно обновлён`,
            position: 'bottomCenter',
          });

          navigate(-1);
        })
        .catch(err => {
          iziToast.error({
            message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
            position: 'bottomCenter',
          });
        });
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={formHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Название жилья</Form.Label>
        <Form.Control type="text" className="mb-3" placeholder="Введите название номера" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Описание (необязательно, не больше 5000 символов)</Form.Label>
        <Form.Control as="textarea" rows={3} className="mb-3" maxLength={5000} placeholder="Введите описание номера" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Выберите фотографии отеля для загрузки (не больше 10)</Form.Label>
        <Form.Control type="file" multiple accept="image/*" onChange={(e: any) => setImages(e.target.files)}/>
      </Form.Group>
      
      <Button variant="success" type="submit">
        Изменить
      </Button>{' '}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  )
}

export default HotelRoomUpdateForm
