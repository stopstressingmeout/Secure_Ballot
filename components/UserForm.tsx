"use client";

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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { useToast } from "./ui/use-toast";
import { Alert } from "./ui/alert";

const formSchema = z.object({
  NID: z.string().length(10, "NID number is invalid!"),
  name: z.string().min(1, "Name cannot be empty!").max(50),
  father: z.string().min(1, "Name cannot be empty!").max(50),
  mother: z.string().min(1, "Name cannot be empty!").max(50),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

const UserForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "John Doe",
      father: "Jason Doe",
      mother: "Jane Doe",
      NID: "6969696969",
      dob: new Date("1990-01-01"),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status == 200) {
          router.push("/vote/otp");
        } else {
          res.json().then((data) => {
            toast({
              title: data.message,
              variant: "destructive",
            });
            setLoading(false);
          });
        }
      });
    } catch (error) {
      toast({
        title: "Something went wrong! Please try again later.",
        variant: "destructive",
      });
      setLoading(false);
    }
  }
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-col items-center space-y-1">
            <CardTitle className="uppercase">Verify Identity</CardTitle>
            <CardDescription>
              Enter your information to confirm your identity
            </CardDescription>
          </CardHeader>
          <CardContent className=" grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <FormField
              control={form.control}
              name={`NID`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`father`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father&apos;s Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`mother`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother&apos;s Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`dob`}
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "P")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Submit
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
      <CardFooter>
        <Alert className="text-sm text-center">
          Make sure the information is exactly as it appears on your NID card.
        </Alert>
      </CardFooter>
    </Card>
  );
};

export default UserForm;
