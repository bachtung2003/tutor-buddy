"use client";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { useClassContext } from "@/contexts/classes-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student, useStudentContext } from "@/contexts/students-data";
import GlobalApi from "@/app/_services/GlobalApi";

type StudentInputs = {
  name: string;
  class: string;
  contact: number;
  address: string;
};

const AddNewStudent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger, // Import trigger to handle validation manually
    reset,
    formState: { errors },
  } = useForm<StudentInputs>();

  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(""); // State to manage the selected class

  const { classes } = useClassContext();
  const { students, setStudents } = useStudentContext();

  // Register the class field with validation
  register("class", { required: "Class is required" });

  const handleClassSelect = (value: string) => {
    setSelectedClass(value);
    setValue("class", value); // Update the form state with the selected class
    trigger("class"); // Trigger validation for the class field
  };

  const onSubmit: SubmitHandler<StudentInputs> = (data) => {
    console.log("FormData", data);
    const createDate = new Date().toISOString();
    const updateDate = new Date().toISOString();

    const newStudent: Student = {
      id: students.length + 1,
      name: data.name,
      class: data.class,
      contact: data.contact.toString(),
      address: data.address,
      ClassId: classes.find((cls) => cls.class === data.class)?.id || 0, // Properly set ClassId
      createdAt: createDate,
      updatedAt: updateDate,
    };

    // Update students state

    GlobalApi.addStudent(newStudent).then((resp: any) => {
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setStudents((prevStudents) => [...prevStudents, newStudent]);
      }
    });
    // Reset form and close dialog
    setSelectedClass("");
    reset();
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Ex. Son Tung"
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="py-2">
                  <label>Class</label>
                  <Select onValueChange={handleClassSelect}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Choose a class">
                        {selectedClass}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((item, index) => (
                        <SelectItem key={index} value={item.class}>
                          {item.class}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.class && (
                    <p className="text-red-500">{errors.class.message}</p>
                  )}
                </div>
                <div className="py-2">
                  <label>Contact Number</label>
                  <Input
                    type="number"
                    {...register("contact")}
                    placeholder="Ex. 0906099999"
                  />
                </div>
                <div className="py-2">
                  <label>Address</label>
                  <Input
                    {...register("address")}
                    placeholder="Ex. Ho Chi Minh city"
                  />
                </div>
                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button
                    type="reset"
                    variant="ghost"
                    onClick={() => {
                      setOpen(false);
                      reset(); // Resets the form if user clicks cancel
                      setSelectedClass(""); // Reset selected class
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
