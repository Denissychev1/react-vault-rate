import { CHOOSE_VAULT, CHOOSE_DATE, SET_FILTER } from "./filter_types";

let nextTodoId = 0;

export const chooseVault = content => ({
    type: CHOOSE_VAULT,
    payload: {
        id: ++nextTodoId,
        content
    }
});

export const chooseDate = id => ({
    type: CHOOSE_DATE,
    payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
