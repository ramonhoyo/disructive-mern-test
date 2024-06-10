import useEntryImage from "./hooks/use-entry-image";

export default function EntryImage({ url, ...props }: any) {
  const { data: img } = useEntryImage(url);

  return <img {...props} src={`data:image/png;base64, ${img}`} />;
}
