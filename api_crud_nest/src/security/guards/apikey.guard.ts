import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApikeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.header('auth'); //  clave valor del header
    const isAuth = header === '1234'; //  codigo de autenticacion valor del header
    if (!isAuth) {
      throw new UnauthorizedException(' USUARIO NO PERMITIDO');
    }
    return isAuth;
  }
}
