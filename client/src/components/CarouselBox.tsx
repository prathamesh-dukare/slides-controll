import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/Carousel";

export default function CarouselComponent() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <div className="  bg-red-500 block w-14 h-14"></div>
        </CarouselItem>
        <CarouselItem>
          <div className="  bg-blue-500 block w-14 h-14"></div>
        </CarouselItem>
        <CarouselItem>
          <div className="  bg-green-500 block w-14 h-14"></div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
