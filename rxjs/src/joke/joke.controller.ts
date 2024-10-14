import { Controller, Get, Query } from '@nestjs/common';
import { JokeService } from './joke.service';

@Controller('joke')
export class JokeController {
  constructor(private readonly jokeService: JokeService) {}

  @Get()
  public getJoke(@Query('count') count: number = 1): Promise<any[]> {
    const jokes = this.jokeService.getJoke(count);
    return jokes;
  }
}
