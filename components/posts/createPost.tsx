'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { postSchema } from '@/lib/validations/post';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { Toaster } from '../ui/toaster';

const CreatePost = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    try {
      setLoadingButton(true);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log('hit');
        setLoadingButton(false);
        useRouter().refresh();
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Error publishing post',
          description: 'Try again in a few minutes',
        });
        setLoadingButton(false);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error publishing post',
        description: 'Try again in a few minutes',
      });
      setLoadingButton(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className='border-none bg-slate-800'
                  placeholder='Title'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className='border-none bg-slate-800'
                  placeholder='Description'
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={loadingButton} type='submit'>
          Submit
        </Button>
      </form>
      <Toaster />
    </Form>
  );
};

export default CreatePost;
