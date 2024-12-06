import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { signInFaliure, signInStart, signInSuccess } from "@/redux/user/userSlice";
import GoogleAuth from "@/components/shared/GoogleAuth";

const formSchema = z.object({

  email: z.string().min({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
});

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {loading,error:errorMessage}=useSelector((state)=>state.user);


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success === false) {
        toast({ title: "Sign in failed!Please try again!" });
        dispatch(signInFaliure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data))
        toast({ title: "Sign in successfull!" });
        navigate("/");
      }
    } catch (error) {
      toast({ title: "Something went wrong!" });
      dispatch(signInFaliure(data.message));
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl sm:max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link
            to={"/"}
            className="font-bold text-2xl sm:text-4xl flex flex-wrap"
          >
            <span className="text-slate-500">Next</span>
            <span className="text-slate-900">News</span>
          </Link>

          <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12">
            Sign in to your account!
          </h2>
          <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-2">
            Welcome back to Next News,Please provide your details
          </p>
        </div>

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="xyz@gmail.com"
                        {...field}
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-blue-500 w-full" disable={loading} >
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
              <GoogleAuth/>

              {errorMessage && <p className="mt-5 text-red-500">{errorMessage}</p>}



            </form>
          </Form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
            <Link to={"/sign-up"} className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
