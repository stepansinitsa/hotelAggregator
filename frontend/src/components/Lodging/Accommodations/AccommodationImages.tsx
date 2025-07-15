import { Carousel, Figure } from "react-bootstrap";

function HotelRoomsItemImgs({ images }: { images: string[] }) {
  return (
    <Carousel data-bs-theme="dark" className="shadow-sm">
      {images.length === 0 ? (
        <Carousel.Item>
          <Figure>
            <Figure.Image
              className="rounded"
              width={550}
              height={350}
              alt="Пример жилья"
              src="/default-accommodation.jpg"
            />
          </Figure>
        </Carousel.Item>
      ) : (
        images.map((img, index) => (
          <Carousel.Item key={index}>
            <Figure>
              <Figure.Image
                className="rounded img-fluid"
                width={550}
                height={350}
                alt={`Номер ${index + 1}`}
                src={`${window.location.origin}/lodgings/${img}`}
              />
            </Figure>
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
}

export default HotelRoomsItemImgs;