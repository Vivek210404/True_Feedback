"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const specialChar = "||";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const [suggestions, setSuggestions] = useState<string[]>([
    "What's your favorite movie?",
    "Do you have any pets?",
    "What's your dream job?",
  ]);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          content: data.content,
        }),
      });

      const response = await res.json();

      if (response.type === "error") {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        form.reset({ ...form.getValues(), content: "" });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    setIsLoading(false);
  };

  const handleMessageClick = (msg: string) => {
    form.setValue("content", msg);
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);

    try {
      const res = await fetch("/api/suggest-messages", {
        method: "POST",
      });
      const text = await res.text();
      const arr = text.split(specialChar);
      setSuggestions(arr);
    } catch (error) {
      toast.error("Failed to fetch suggested messages");
    }

    setIsSuggestLoading(false);
  };

  return (
    <div className="container mx-auto my-8 max-w-4xl rounded bg-white p-6">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Public Profile Link
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      {/* Suggested Messages */}
      <div className="space-y-4 my-8">
        <Button
          onClick={fetchSuggestedMessages}
          disabled={isSuggestLoading}
          className="my-4"
        >
          {isSuggestLoading ? "Loading..." : "Suggest Messages"}
        </Button>

        <p>Tap any message to use it</p>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Suggested Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            {suggestions.map((msg, i) => (
              <Button
                key={i}
                variant="outline"
                className="whitespace-normal text-left justify-start"
                onClick={() => handleMessageClick(msg)}
              >
                {msg}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href="/sign-up">
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
