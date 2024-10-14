import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  from,
  map,
  Observable,
  toArray,
  firstValueFrom,
  mergeAll,
  take,
} from 'rxjs';

@Injectable()
export class RxjsService {
  private readonly gitHubUrl = 'https://api.github.com/search/repositories?q=';

  private getResFromGit(repository: string, maxCount: number): Observable<any> {
    return from(axios.get(`${this.gitHubUrl}${repository}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll(),
      )
      .pipe(take(maxCount));
  }

  public async searchRepo(repository: string, maxCount: number): Promise<any> {
    const data$ = this.getResFromGit(repository, maxCount).pipe(toArray());
    data$.subscribe(() => {});
    return await firstValueFrom(data$);
  }
}
