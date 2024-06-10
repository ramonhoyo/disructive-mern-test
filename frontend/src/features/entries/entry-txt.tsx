import useEntryFile from "./hooks/use-entry-file";
import { useMemo } from "react";

export default function EntryTxt({ url, ...props }: any) {
  const { data } = useEntryFile(url);
  const text = useMemo(() => {
    if (!data) return '';

    return Buffer.from(data).toString('utf8');
  }, [data]);

  return <pre {...props} disabled>{text}</pre>;
}
