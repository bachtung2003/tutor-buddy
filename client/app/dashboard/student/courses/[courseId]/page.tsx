"use client";
import thumbImg from "@/public/course.png";
import React, { useState } from "react";
import { data } from "@/components/student/courses/demoCourses";
import {
  CirclePlay,
  Clock4,
  Globe,
  MonitorSmartphone,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ChevronDown, PlayCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type Lesson = {
  title: string;
  duration: string;
};
const courseContent: Lesson[] = [
  {
    title: "Bài 1: Cách ứng dụng mô hình Cộng tác viên hiệu quả",
    duration: "22:33",
  },
  {
    title: "Bài 2: Công thức xây dựng mô hình Cộng tác viên",
    duration: "13:35",
  },
];

const page = ({ params }: { params: { courseId: string } }) => {
  const courseDetails = React.useMemo(
    () => data.find((obj) => obj.id === params.courseId),
    [params.courseId]
  );
  const [isOpen, setIsOpen] = useState(false);
  console.log(courseDetails);
  const description = `Việc xây dựng hệ thống cộng tác viên khi làm Affiliate chính là 1 nguồn traffic dồi dào giúp công việc tiếp thị liên kết trở nên dễ dàng hơn bao giờ hết.
            
            Nhưng để xây dựng nên một “pháo đài” hùng mạnh như vậy liệu có dễ dàng? Mất bao lâu để chúng ta có thể hoàn thành đội quân hùng mạnh ấy?
            
            Nghe có vẻ gian truân nhỉ? Nhưng thực ra dễ hơn bạn nghĩ nhiều đấy!
            
            Khóa học này sẽ giúp bạn hiểu rõ, làm đúng hơn, kiếm tiền nhanh hơn với việc ứng dụng mô hình Cộng tác viên trong Affiliate Marketing cùng:
            
            1. Top publisher sử dụng mô hình CTV trong Affiliate - Nguyễn Thành Long
            2. Thủ lĩnh cộng đồng ACCESSTRADE - Trung Nguyễn`;

  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white p-8 text-left">
        <h1 className="text-3xl font-bold">Physics 3 - Fundamentals</h1>
        <div className="flex space-x-4 items-center mt-2">
          <p className="text-sm">ACCESSTRADE Academy</p>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <Star className="w-4 h-4 text-orange-400" />
            <span className="ml-1">4 Ratings</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Users className="w-4 h-4" />
            <span>221 Students</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Course Details */}
        <div className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <Image
              src="/course.png"
              alt="Course Thumbnail"
              width={400}
              height={200}
              className="w-full h-56 object-cover rounded-lg"
            />
          </div>
          <div className="flex-grow space-y-4">
            <p className=" text-black text-2xl text-center font-extrabold">
              RESUME
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-1">
                <Clock4 />
                <strong> Duration:</strong> 20 hours
              </li>
              <li className="flex gap-1">
                <CirclePlay />
                <strong>Giáo trình:</strong> 10 lessons
              </li>
              <li className="flex gap-1">
                <Globe />
                <strong>Global</strong>
              </li>
              <li className="flex gap-1">
                <MonitorSmartphone />
                Learn on all devices: Mobile, TV, PC
              </li>
            </ul>
            <Button className="bg-primary text-white w-full">Study Now</Button>
          </div>
        </div>

        {/* Course Description */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Giới thiệu khóa học</h2>
          <p
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, "<br />"),
            }}
          ></p>
        </section>

        {/*/ Course Contents */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Nội dung khoá học</h2>
          {/* Dropdown for Course Content */}
          <Accordion type="single" collapsible>
            <AccordionItem value="content">
              <AccordionTrigger className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-5 h-5 text-gray-800" />
                  <span className="font-semibold">Mục lục</span>
                </div>
                <span className="text-blue-500 text-sm">
                  2 Bài học - 36 phút
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                {courseContent.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-gray-600" />
                      <span>{lesson.title}</span>
                    </div>
                    <span className="text-gray-500">{lesson.duration}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Course Review */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Học viên đánh giá</h2>
          <div></div>
        </section>
      </main>
    </div>
  );
};

export default React.memo(page);
