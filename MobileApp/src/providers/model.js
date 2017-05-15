var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export var initState = { user: { username: "test_user" }, modules: [] };
export function reducer() {
    return function (store, state, action) {
        switch (action.type) {
            case 'SET_USER':
                var newUser = action.user;
                return __assign({}, state, { user: newUser });
            case 'SET_MODULES':
                var newModules = action.modules;
                return __assign({}, state, { modules: newModules });
            case 'APPEND_MODULE':
                var updatedModule = state.modules.concat([action.module]);
                return __assign({}, state, { modules: updatedModule });
            case 'ADD_MODULE':
                var addedModules = state.modules.concat([{ "_id": action.module }]);
                return __assign({}, state, { modules: addedModules });
            case 'REMOVE_MODULE':
                var deletedModules = state.modules.concat([{ "_id": action.module }]);
                return __assign({}, state, { modules: addedModules });
            default:
                return state;
        }
    };
}
function wrapIntoBehavior(init, obs) {
    var res = new BehaviorSubject(init);
    obs.subscribe(function (s) { return res.next(s); });
    return res;
}
//# sourceMappingURL=model.js.map