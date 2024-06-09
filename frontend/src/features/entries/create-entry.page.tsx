"use client";
import ResponsiveAppBar from "@/src/common/responsive-appbar";
import { Formik } from 'formik';
import { CreateEntryFormSchema } from "./form-schemas/create-entry.schema";
import { createEntry } from "./entries.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import CreateEntryForm from "./forms/create-entry.form";

export default function CreateEntryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();
  const mutation = useMutation({
    mutationFn: createEntry,
  });

  return (
    <main>
      <ResponsiveAppBar />

      <Formik
        initialValues={{
          title: '',
          content: '',
          topicId: '',
        }}
        render={CreateEntryForm}
        validationSchema={CreateEntryFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              snackbar.enqueueSnackbar('Post created', { variant: 'success' });
              queryClient.invalidateQueries({ queryKey: ['entries/mine'] });
              router.replace('/entries');
            },
            onError: (err) => {
              console.error(JSON.stringify(err, null, 2));
              snackbar.enqueueSnackbar('Error creating post', { variant: 'error' });
            },
            onSettled: () => {
              setSubmitting(false);
            },
          });
        }}
      />
    </main>
  )
}
