// RxJS v6+
import { of } from 'rxjs';
import { delay, tap, mergeMap, repeat } from 'rxjs/operators';

const path = 'https://hub.meshtastic.org/v1/';

const getNodes = () => fetch(path + 'geoJSON/nodes')
        .then((response) => response.json())


const pollGetNodes = (event: (x:any) => void) => of({}).pipe(
  mergeMap(_ => getNodes()),
  tap(event),
  delay(3000),
  repeat()
);

export {
  getNodes,
  pollGetNodes
}


