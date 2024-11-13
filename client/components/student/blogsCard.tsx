import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export function ProcessesCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-[#1C1D1D]">New Blogs For You</CardTitle>
      </CardHeader>
      <CardContent className="mx-4">
        <div className="">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 w-auto">
                    <Card className="h-[155px]">
                      <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                        <div className="flex flex-col h-full justify-between">
                          <span className="xl:text-base font-semibold text-center text-primary min-[1028px]:text-sm text-xs hover:text-blue-500">
                            <Link href={"#"}>
                              {index + 1} Back to School: Parents' Guide to
                              Mitigating the Effects of Education's Long COVID
                              on Their Children
                            </Link>
                          </span>
                          <span className="text-xs my-2 text-center text-slate-500">
                            by Evan Jacoby • April 2024
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-center ">
        <Link href={"/dashboard/student/assignments"} className="w-full">
          <Button className="w-full text-primary bg-[#FFF5F0] text-sm shadow-none hover:text-white hover:bg-primary">
            see more
          </Button>
        </Link>
      </CardFooter> */}
    </Card>
  );
}
