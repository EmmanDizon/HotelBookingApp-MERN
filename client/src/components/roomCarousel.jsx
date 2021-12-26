import { Carousel } from "react-bootstrap";

const RoomCarousel = ({ room }) => {
  return (
    <Carousel>
      {room.imageurls.map((img) => {
        return (
          <Carousel.Item key={img}>
            <input
              type="image"
              img
              src={img}
              className="big-image"
              alt="Cannot render image"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default RoomCarousel;
