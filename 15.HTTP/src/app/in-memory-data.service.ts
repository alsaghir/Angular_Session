import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

    /** 2
     * Creating database to simulate response data from and to the server
     */

  createDb() {
    const data = [
        {
            'capacity': 10,
            'id': 5991,
            'name': 'Test Server'
        },
        {
            'capacity': 100,
            'id': 9573,
            'name': 'Live Server'
        },
        {
            'capacity': 50,
            'id': 1412,
            'name': 'Dev Server'
        }

    ];
    const appName = 'Http Test';
    return {data, appName};
  }
}
