/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery, useValidatePasswordMutation } from "@/redux/feature/Auth/auth.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Phone,
  Shield,
  Calendar,
  Settings,
  Edit,
  Hand,
} from "lucide-react";

import SkeletonTable from "@/components/Skeletons/TableSkeletons";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PasswordInput from "@/components/ui/PasswordInput";
import { useState } from "react";
import { useUpdateProfileMutation } from "@/redux/feature/user/user.api";

const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[^a-zA-Z0-9]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    }),
  password: z.string().min(6, "Password is required for confirmation"),
});

type UpdateFormData = z.infer<typeof updateSchema>;

export default function Profile() {
  const [open,setOpen] = useState(false)
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [updateUser] = useUpdateProfileMutation();
  const [validatePassword] = useValidatePasswordMutation();
  const user = data?.data;

  const form = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      newPassword: '',
      password: "",
    },
  });

  const onSubmit = async (values: UpdateFormData) => {
    console.log(values)
    const toastId = toast.loading("Processing...");
    try {
      const validatePasswordReq = await validatePassword({ password: values.password })
      if (validatePasswordReq?.data?.success) {
        try {
          await updateUser({ name: values?.name, phone: values?.phone  , password : values?.newPassword }).unwrap();
          toast.success("Profile updated successfully!", { id: toastId });
          setOpen(false)

        } catch (error) {
          console.log(error)
          toast.error("Something went wrong", {
            id: toastId,
          })

        }

      }
      else if (validatePasswordReq?.error?.data?.message) {
        toast.error(validatePasswordReq?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }




    } catch (error: any) {
      console.log(error)
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="space-y-8 p-4 md:p-8">

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div>
            <div className="flex gap-2 items-center">
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 md:text-4xl">
                Hello, {user?.name || "User"}!
              </h1>
              <Hand size={32} className="text-yellow-600 waving-hand" />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Manage your account and personal information here.
            </p>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <Settings size={20} />
        </Button>
      </div>


      <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-col items-center justify-center p-6">
          <Avatar className="h-28 w-28 border-4 border-blue-600 shadow-sm mb-4">
            <AvatarImage alt={user?.name} />
            <AvatarFallback className="text-4xl font-semibold">
              <User size={48} />
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {user?.name || "Unnamed User"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {user?.role || "User"}
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {user?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-blue-800 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Phone Number
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {user?.phone || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {user?.role || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Member Since
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>

        <Separator />


        <div className="flex justify-center p-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)} className="w-full h-10 bg-gradient-to-r from-blue-600  to-indigo-800 text-white hover:opacity-90">
                <Edit className="h-5 w-5 mr-2" /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile. You must enter your password to confirm.
                </DialogDescription>
              </DialogHeader>


              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+8801XXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm with Password</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600  to-indigo-800 text-white hover:opacity-90"
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}
