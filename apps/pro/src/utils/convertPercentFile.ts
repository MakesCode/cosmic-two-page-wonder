import { AxiosProgressEvent } from 'axios';

export const convertPercentFile = (e: AxiosProgressEvent, fileSize: File['size']): number => Math.trunc((e.loaded / fileSize) * 100);
