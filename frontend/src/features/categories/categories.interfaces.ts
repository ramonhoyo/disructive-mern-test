
export enum ContentType {
  Text = 'Text',
  Video = 'Video',
  Image = 'Image',
  Txt = 'Txt',
}

export interface Category {
  id: string;
  name: string;
  contentTypeS: ContentType[];
  createdAt: string;
  createdBy: string;
}
