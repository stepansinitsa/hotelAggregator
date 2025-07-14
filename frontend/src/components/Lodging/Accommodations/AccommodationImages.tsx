import { Carousel, Figure } from "react-bootstrap"

function HotelRoomsItemImgs({ images }: { images: string[] }) {
  return (
    <Carousel data-bs-theme="dark">
      {images.length === 0 ? (
        <Carousel.Item>
          <Figure>
            <Figure.Image
              className="rounded"
              width={550}
              height={350}
              alt="Room Image"
              src="https://myaddress.jpg"
            />
          </Figure>
        </Carousel.Item>
      ) : (
        images.map((elem, i) =>
          <Carousel.Item key={i}>
            <Figure>
              <Figure.Image
                className="rounded"
                width={550}
                height={350}
                alt="Room Image"
                src={window.location.origin + '/lodgings/' + elem}
              />
            </Figure>
          </Carousel.Item>
        )
      )}
    </Carousel>
  )
}

export default HotelRoomsItemImgs
