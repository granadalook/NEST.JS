import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

//export const Public = (...args: string[]) => SetMetadata('public', args);  declaracion oficial
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
