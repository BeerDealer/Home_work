import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RxjsModule } from './rxjs/rxjs.module';
import { JokeModule } from './joke/joke.module';

@Module({
  imports: [RxjsModule, JokeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
