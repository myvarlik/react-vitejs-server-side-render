import { serverFetcher } from './serverFetcher';
import { clientFetcher } from './clientFetcher';

export const fetcher = (TheComponent: any, fetch: any, stateName: string) => {
    let Fecher;
    var date = new Date();

    if (import.meta.env.SSR) {
        Fecher = serverFetcher(TheComponent, stateName)
        console.log(date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    } else {
        console.log(date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        Fecher = clientFetcher(TheComponent, stateName, fetch)
    }

    return Fecher;
}