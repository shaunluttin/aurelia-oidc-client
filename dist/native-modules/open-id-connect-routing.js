var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoinject } from 'aurelia-framework';
import { OpenIdConnectAuthorizeStep } from './open-id-connect-authorize-step';
var OpenIdConnectRouting = /** @class */ (function () {
    function OpenIdConnectRouting(openIdConnectConfiguration, openIdConnectNavigationStrategies, $window, 
        // @ts-ignore
        logger) {
        this.openIdConnectConfiguration = openIdConnectConfiguration;
        this.openIdConnectNavigationStrategies = openIdConnectNavigationStrategies;
        this.$window = $window;
        this.logger = logger;
    }
    OpenIdConnectRouting.prototype.configureRouter = function (routerConfiguration) {
        this.addLoginRedirectRoute(routerConfiguration);
        this.addLogoutRedirectRoute(routerConfiguration);
        routerConfiguration.addPipelineStep('authorize', OpenIdConnectAuthorizeStep);
    };
    OpenIdConnectRouting.prototype.addLoginRedirectRoute = function (routerConfiguration) {
        var _this = this;
        routerConfiguration.mapRoute({
            name: 'logInRedirectCallback',
            navigationStrategy: function (instruction) {
                if (_this.isSilentLogin()) {
                    return _this.openIdConnectNavigationStrategies.silentSignInCallback(instruction);
                }
                else {
                    return _this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction);
                }
            },
            route: this.getPath(this.openIdConnectConfiguration.redirectUri),
        });
    };
    OpenIdConnectRouting.prototype.addLogoutRedirectRoute = function (routerConfiguration) {
        var _this = this;
        routerConfiguration.mapRoute({
            name: 'logOutRedirectCallback',
            navigationStrategy: function (instruction) {
                return _this.openIdConnectNavigationStrategies.signOutRedirectCallback(instruction);
            },
            route: this.getPath(this.openIdConnectConfiguration.postLogoutRedirectUri),
        });
    };
    OpenIdConnectRouting.prototype.isSilentLogin = function () {
        try {
            return this.$window.self !== this.$window.top;
        }
        catch (e) {
            return true;
        }
    };
    OpenIdConnectRouting.prototype.getPath = function (uri) {
        return this.convertUriToAnchor(uri).pathname;
    };
    OpenIdConnectRouting.prototype.convertUriToAnchor = function (uri) {
        var anchor = document.createElement('a');
        anchor.href = uri;
        return anchor;
    };
    OpenIdConnectRouting = __decorate([
        autoinject
    ], OpenIdConnectRouting);
    return OpenIdConnectRouting;
}());
export { OpenIdConnectRouting };
