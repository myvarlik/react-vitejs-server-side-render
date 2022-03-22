import { route } from "./route";
import { fetching } from './utility/fetching';
import { fetcher } from '../partial/fetcher/fetcher'

//pages
import Home from "../pages/Home";
import About from "../pages/About";

const routeFetchArr = {
    "home": () => fetching({ url: "http://localhost:3002/" })
}

export const routeMap = [
    {
        path: route.home,
        component: fetcher(Home, routeFetchArr.home, "test"),
        exact: true,
        fetch: routeFetchArr.home,
        stateName: "test"
    },
    {
        path: route.about,
        component: About,
    },
];