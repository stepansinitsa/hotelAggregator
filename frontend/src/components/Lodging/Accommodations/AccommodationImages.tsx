import { Carousel, Figure } from "react-bootstrap";

interface AccommodationImagesProps {
  images: string[];
}

const AccommodationImages = ({ images }: AccommodationImagesProps) => {
  return (
    <Carousel data-bs-theme="dark">
      {images.length === 0 ? (
        <Carousel.Item>
          <Figure>
            <Figure.Image
              width={550}
              height={350}
              alt="Пример изображения"
              src=" https://ami.by/thumbs/getthumb.php?w=200&h=267&src=images/catalogue/items/stenka-stefgold-0.jpg"
            />
          </Figure>
        </Carousel.Item>
      ) : (
        images.map((img, index) => (
          <Carousel.Item key={index}>
            <Figure>
              <Figure.Image
                width={550}
                height={350}
                alt={`Номер ${index + 1}`}
                src={`${window.location.origin}/lodging/${img}`}
              />
            </Figure>
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
};

export default AccommodationImages;