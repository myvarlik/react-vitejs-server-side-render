import { Component } from 'react';
import { connect, setStore } from "trim-redux";
import { defaultState } from "../../setup/store";
import { responseValidation } from "../../setup/utility/responseValidation";
import { convertErrorToResponse } from "../../setup/utility/convertErrorToResponse";
import axios from "axios";

export const clientFetcher = function (TheComponent: any, stateName: string, fetch: any) {
    class Fecher extends Component {
        constructor(props: any) {
            super(props);
            this.setParams();

            if (this.needFetch())
                this.fetchProvider()
            else
                this.debugLog(false)
        }

        needFetch() {
            let needFetch = false;
            console.log(this.props);

            try {
                needFetch = JSON.stringify(this.props[stateName]) === JSON.stringify(defaultState[stateName]);
            } catch (err) {
                console.error('⚠ data is not valid.', err);
            }
            return needFetch
        }

        // params passed to fetch() on the client
        setParams() {
            this.ftechParams = {
                match: this.props.match
            }

            return true;
        }

        // fetch data and insert to 'stateName'
        fetchProvider() {
            this.debugLog(true);

            const request = fetch(this.ftechParams);

            this.cancelRequest = request.cancel;

            request.then((response) => {
                responseValidation(response);
                setStore(stateName, response.data);
            })
                .catch(function (err) {
                    // ignore canceled request
                    if (axios.isCancel(err))
                        return;

                    const response = convertErrorToResponse(err);
                    setStore(stateName, response.data);
                })
                .then(() => {
                    delete this.cancelRequest;
                })
        }

        debugLog(inClient: any) {
            console.info((inClient ? '🙎‍♂️' : '🌎') + ' fetch ' + this.props.match.url + ' in ' + (inClient ? 'client' : 'server'));
        }

        resetDataHolder() {
            const defaultValue = defaultState[stateName];
            setStore(stateName, defaultValue);

            if (this.cancelRequest) {
                this.cancelRequest();
                delete this.cancelRequest;
            }
        }

        shouldComponentUpdate() {
            return this.setParams()
        }

        componentDidUpdate(prevProps: any) {
            if (this.props.location.key === prevProps.location.key && !this.needFetch())
                return;

            // update match
            this.ftechParams.match = this.props.match;

            // to show loading
            this.resetDataHolder();

            // get data of new route
            this.fetchProvider();
        }

        // then clear state to refetching data on next mounting
        componentWillUnmount() {
            this.resetDataHolder();
        }

        render() {
            return <TheComponent {...this.props} />;
        }
    }

    return connect((s: any) => ({ [stateName]: s[stateName] }))(Fecher);
}
