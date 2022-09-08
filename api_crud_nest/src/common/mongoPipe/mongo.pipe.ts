import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`${value} NO ES UN ID DE  MONGO`);
    }
    return value;
  }
}
