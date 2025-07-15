import { Carousel, Figure } from "react-bootstrap";

function HotelsListItemImgs({ images }: { images: string[] }) {
  return (
    <Carousel data-bs-theme="dark" variant="dark" className="shadow-sm rounded">
      {images.length === 0 ? (
        <Carousel.Item>
          <Figure>
            <Figure.Image
              className="rounded img-fluid"
              width={550}
              height={350}
              alt="Стандартное фото отеля"
              src="/default-hotel.jpg"
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
                alt={`Фото отеля ${index + 1}`}
                src={`${window.location.origin}/hotels/${img}`}
              />
            </Figure>
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
}

export default HotelsListItemImgs;