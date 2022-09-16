import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ApiServiceService } from './api-service/api-service.service';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [ApiServiceService],
  exports: [ApiServiceService, HttpModule],
})
export class ApiConetionModule {}
