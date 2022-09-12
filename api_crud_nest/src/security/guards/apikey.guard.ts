import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // de  esta  forma    leemos la metadata desde el controller
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.header('auth'); //  clave valor del header
    const isAuth = header === '1234'; //  codigo de autenticacion valor del header
    if (!isAuth) {
      throw new UnauthorizedException(' USUARIO NO PERMITIDO');
    }
    return isAuth;
  }
}
