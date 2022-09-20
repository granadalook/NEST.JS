/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ApiServiceService {
  constructor(private httpService: HttpService) {}
  findCharacter() {
    return lastValueFrom(
      this.httpService
        .get(`https://rickandmortyapi.com/api/character/3`)
        .pipe(map((res) => res.data.name)),
    );
  }

  findSimsom() {
    return lastValueFrom(
      this.httpService
        .get('https://thesimpsonsquoteapi.glitch.me/quotes?count=1')
        .pipe(map((res) => res.data)),
    );
  }

  findMarvel(params) {
    return lastValueFrom(
      this.httpService
        .get(
          `http://gateway.marvel.com/v1/public/comics?ts=${params.ts}&apikey=${params.apikey}&hash=${params.hash}`,
        )
        .pipe(map((res) => res.data)),
    );
  }
}
