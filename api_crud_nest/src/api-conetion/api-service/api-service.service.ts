import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ApiServiceService {
  constructor(private httpService: HttpService) {}
  findCharacter() {
    return lastValueFrom(
      this.httpService
        .get(`https://rickandmortyapi.com/api/character/2`)
        .pipe(map((res) => res.data)),
    );
  }

  findSimsom() {
    return lastValueFrom(
      this.httpService
        .get('https://thesimpsonsquoteapi.glitch.me/quotes?count=1')
        .pipe(map((res) => res.data)),
    );
  }
}
