
export enum ContentType {
  Text = 'Text',
  Videos = 'Videos',
  Images = 'Images',
}

export interface Category {
  id: string;
  title: string;
  contentTypeS: ContentType[];
  createdAt: string;
  createdBy: string;
}
