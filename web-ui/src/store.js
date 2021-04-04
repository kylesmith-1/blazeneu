import { createStore, combineReducers } from 'redux';

function users(state = load_users(), action) {
    if (action.type === 'users/set') {
        save_users(action.data);
        return action.data;
    } else {
        if (state == null) {
            return [];
        } else {
            return state;
        }
    }
}

function save_users(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function load_users() {
    let users = localStorage.getItem("users");
    return JSON.parse(users);
}

function events(state = load_events(), action) {
    if (action.type === 'events/set') {
        save_events(action.data);
        return action.data;
    } else {
        if (state == null) {
            return [];
        } else {
            return state;
        }
    }
}

function save_events(events) {
    localStorage.setItem("events", JSON.stringify(events));
}

function load_events() {
    let events = localStorage.getItem("events");
    return JSON.parse(events);
}

function save_session(sess) {
    if (sess) {
        let session = Object.assign({}, sess, { time: Date.now() });
        localStorage.setItem("session", JSON.stringify(session));
    } else {
        localStorage.setItem("session", null);
    }
}

function load_session() {
    let session = localStorage.getItem("session");
    if (session === "null" || session == null) {
        return null;
    }
    session = JSON.parse(session);
    let age = Date.now() - session.time;
    let hours = 60*60*1000;
    if (age < 24 * hours) {
        return session;
    } else {
        return null;
    }
}

function session(state = load_session(), action) {
    switch (action.type) {
        case 'session/set':
            save_session(action.data);
            return action.data;
        case 'session/clear':
            save_session(null);
            return null;
        default:
            return state;
    }
}

function error(state = null, action) {
    switch (action.type) {
        case 'error/set':
            return action.data;
        case 'session/set':
            return null;
        default:
            return state;
    }
}

function root_reducer(state, action) {
    let redu = combineReducers(
        {users,events,session,error
    });

    let state1 = redu(state, action);

    return state1;
}

let store = createStore(root_reducer);
export default store;
