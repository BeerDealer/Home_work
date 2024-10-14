import { Controller, Get, Query } from '@nestjs/common';
import { RxjsService } from './rxjs.service';
import { IQuryData } from './interfaces/query-data.interface';

@Controller('git')
export class RxjsController {
  constructor(private readonly rxjsService: RxjsService) {}

  @Get()
  public async test(@Query() { repository, maxCount }: IQuryData) {
    const data$ = this.rxjsService.searchRepo(repository, maxCount);
    console.log(data$);
    return data$;
  }
}
