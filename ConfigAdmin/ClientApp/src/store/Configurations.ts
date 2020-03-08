import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ConfigurationsState {
    isLoading: boolean;
    keyword: string;
    currentPageNumber: number;
    pageLength: number;
    configurations: Configurations[];
}

export interface Configurations {
    id: number;
    name: string;
    type: string;
    value: string;
    isActive: boolean;
    applicationName: string;
}

interface ReceiveConfigurationsDTO {
    keyword: string;
    currentPageNumber: number;
    pageLength: number;
    configurations: Configurations[];
}


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestConfigurations {
    type: 'REQUEST_CONFIGURATIONS';
    keyword?: string;
    currentPageNumber?: number;
}

interface ReceiveConfigurations {
    type: 'RECEIVE_CONFIGURATIONS';
    keyword: string;
    currentPageNumber: number;
    pageLength: number;
    force?: boolean;
    configurations: Configurations[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestConfigurations | ReceiveConfigurations;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).


/*
 *
 * 
 *  {
        public string Keyword { get; set; }
        public int CurrentPageNumber { get; set; }
        public int PageNumber { get; set; }

    }
 * */

export const actionCreators = {
    requestConfigurations: (keyword?: string, currentPageNumber?: number, force?: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (force || (appState && appState.configurations && currentPageNumber !== appState.configurations.currentPageNumber)) {
            fetch(`configuration`, {
                method: 'POST',
                body: JSON.stringify({
                    keyword,
                    currentPageNumber,
                    pageLength: 5 // TODO: Make it dynamic
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json() as Promise<ReceiveConfigurationsDTO>)
                .then(data => {
                    dispatch({
                        type: 'RECEIVE_CONFIGURATIONS', keyword: data.keyword,
                        currentPageNumber: data.currentPageNumber, pageLength: data.pageLength, configurations: data.configurations, force: force
                    });
                });

            dispatch({
                type: 'REQUEST_CONFIGURATIONS', keyword: keyword, currentPageNumber: currentPageNumber
            });
        }
    },
    addConfiguration: (data: any): AppThunkAction<KnownAction> => (dispatch, getState) => {

        fetch(`configuration/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json() as Promise<ReceiveConfigurationsDTO>)
            .then(data => {
                //dispatch({
                //    type: 'RECEIVE_CONFIGURATIONS', keyword: data.keyword,
                //    currentPageNumber: data.currentPageNumber, pageLength: data.pageLength, configurations: data.configurations
                //});
            });


    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ConfigurationsState = { configurations: [], isLoading: false, currentPageNumber: 0, pageLength: 10, keyword: "" };

export const reducer: Reducer<ConfigurationsState> = (state: ConfigurationsState | undefined, incomingAction: Action): ConfigurationsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CONFIGURATIONS':
            return {
                configurations: state.configurations,
                currentPageNumber: state.currentPageNumber,
                keyword: state.keyword,
                pageLength: state.pageLength,
                isLoading: true
            };
            break;
        case 'RECEIVE_CONFIGURATIONS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.force || (action.currentPageNumber !== state.currentPageNumber)) {
                return {
                    configurations: action.configurations,
                    currentPageNumber: action.currentPageNumber,
                    keyword: action.keyword,
                    pageLength: action.pageLength,
                    isLoading: false
                };
            }
            break;
    }
    return state;
};
