import { connect } from "trim-redux";

export const serverFetcher = function (TheComponent: any, stateName: string) {
    let Fecher = function (props: any) {
        const mstp = (state: any) => ({
            [stateName]: state[stateName]
        });
        props["yahya"] = "asfdsfsd";
        TheComponent = connect(mstp)(TheComponent);
        return <TheComponent {...props} />;
    }

    return connect((s: any) => ({ [stateName]: s[stateName] }))(Fecher);
}