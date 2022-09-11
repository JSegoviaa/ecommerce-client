import { Errors } from './errors';

export interface UploadedPictureResp {
  msg: string;
  ok: boolean;
  uploadedPicture: Picture;
  errors?: Errors[];
}

export interface Picture {
  id: number;
  url: string;
}
