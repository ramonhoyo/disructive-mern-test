
export enum ContentType {
  Text = 'Text',
  Videos = 'Videos',
  Images = 'Images',
}

export interface Category {
  id: string;
  name: string;
  contentTypeS: ContentType[];
  createdAt: string;
  createdBy: string;
}
