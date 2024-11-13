"use client";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useClassContext } from "@/contexts/classes-data";
import GlobalApi from "@/services/globalApi";
import { getSession } from "@/utils/auth";

type Inputs = {
  class: string;
};

const AddNewClass = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { classes, setClasses } = useClassContext();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("FormClassData", data);
    const userRole: any = getSession();
    const createDate = new Date();
    const updateDate = new Date();
    const newClass = {
      id: classes.length + 1,
      class: data.class,
      createdAt: createDate.toISOString(),
      updatedAt: updateDate.toISOString(),
      UserId: userRole.id,
    };

    // Update the context with the new class
    setClasses((prevClasses) => [...prevClasses, newClass]);
    GlobalApi.addClass(newClass).then((resp: any) => {
      console.log("--", resp);
    });

    reset();
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Class</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>Class name</label>
                  <Input
                    {...register("class", {
                      required: "Class name is required",
                    })}
                    placeholder="Ex. Physics 3"
                  />
                  {/* Display the error message if class is required */}
                  {errors.class && (
                    <p className="text-red-500">{errors.class.message}</p>
                  )}
                </div>
                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button
                    type="reset"
                    variant="ghost"
                    onClick={() => {
                      setOpen(false);
                      reset();
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

export default AddNewClass;
