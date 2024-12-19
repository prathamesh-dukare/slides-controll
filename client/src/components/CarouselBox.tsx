import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/Carousel";

export default function CarouselComponent() {
  return (
    <div className="relative">
      <Carousel className="w-full max-w-sm mx-auto rounded-lg">
        <CarouselContent className="-ml-2 md:-ml-4 rounded-lg">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card className="bg-gray-200 rounded-lg">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-xl font-semibold text-pretty">
                      <span className="md:hidden">Swipe me</span>
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* desktop */}
        <div className="hidden md:block">
          <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
        </div>

        {/* mobile */}
        <div className="mt-4 flex justify-center gap-8 md:hidden">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </div>
  );
}
