import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; //calve key

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
