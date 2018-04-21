"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_component_1 = require("./authentication.component");
const signin_component_1 = require("./signin/signin.component");
const signup_component_1 = require("./signup/signup.component");
exports.AuthenticationRoutes = [{
        path: 'authentication',
        component: authentication_component_1.AuthenticationComponent,
        children: [
            { path: 'signin', component: signin_component_1.SigninComponent },
            { path: 'signup', component: signup_component_1.SignupComponent },
        ],
    }];
//# sourceMappingURL=authentication.routes.js.map