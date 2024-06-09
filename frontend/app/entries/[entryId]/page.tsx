import EntryDetailPage from "@/src/features/entries/entry-detail.page";

export default function Page({ params }: { params: { entryId: string } }) {
  return (
    <EntryDetailPage entryId={params.entryId} />
  );
}
