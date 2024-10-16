import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { firstValueFrom, forkJoin, from, map, Observable } from 'rxjs';

@Injectable()
export class JokeService {
  private readonly apiUrl = 'https://v2.jokeapi.dev/joke/Any';

  private sendRequest(): Observable<any> {
    return from(axios.get(this.apiUrl)).pipe(
      map((res) => {
        return {
          setup: res.data.setup,
          delivery: res.data.delivery,
        };
      }),
    );
  }

  public async getJoke(count: number) {
    const requests = Array.from({ length: count }, () => this.sendRequest());
    const results$ = forkJoin(requests).pipe(
      map((jokes) =>
        jokes.filter(
          (joke) => joke.setup !== undefined && joke.delivery !== undefined,
        ),
      ),
    );

    results$.subscribe(() => {});
    return await firstValueFrom(results$);
  }
}
