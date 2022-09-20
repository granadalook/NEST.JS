/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApiNamesDto } from '../../../products/dto/apinames.dto';
import { ApiName } from '../../../products/entities/apinames.entity';
import { Repository } from 'typeorm';
import { ApiServiceService } from '../../../api-conetion/api-service/api-service.service';

@Injectable()
export class ApiNamesService {
  constructor(
    @InjectRepository(ApiName) private apiNameRepo: Repository<ApiName>,
    private apiConetionService: ApiServiceService,
  ) {}

  async createApi(body: CreateApiNamesDto, params) {
    body.nameRick = await this.apiConetionService.findCharacter();
    const name = await this.apiConetionService.findSimsom();
    body.nameSimp = name.map((item) => item.character);
    const marvel = await this.apiConetionService.findMarvel(params);
    body.nameMarvel = marvel.data.results.map((item) => item.title);
    const newApi = this.apiNameRepo.create(body);
    return this.apiNameRepo.save(newApi);
  }
  async createMarvel(params) {
    return await this.apiConetionService.findMarvel(params);
  }
}
