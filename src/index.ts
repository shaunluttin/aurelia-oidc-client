import { FrameworkConfiguration } from "aurelia-framework";
import { User, UserManager, UserManagerSettings, WebStorageStateStore, Log } from "oidc-client";
import { OpenIdConnectRoles } from "./open-id-connect-roles";
import { OpenIdConnectRouting } from "./open-id-connect-routing";
import { OpenIdConnectConfiguration } from "./open-id-connect-configuration";
import { OpenIdConnectAuthorizeStep } from "./open-id-connect-authorize-step";
import { OpenIdConnectLogger } from "./open-id-connect-logger";
import { OpenIdConnect } from "./open-id-connect";

function configure(config: FrameworkConfiguration, callback: Function) {

    let logger: OpenIdConnectLogger = config.container.get(OpenIdConnectLogger);

    config.globalResources("./open-id-connect-user-block");
    config.globalResources("./open-id-connect-role-filter");

    callback(function (oidcConfig: OpenIdConnectConfiguration) {
        logger.debug("Configuring the OpenId Connect Client");

        let userManagerSettings = oidcConfig.userManagerSettings;

        config.container.registerInstance(UserManager, new UserManager(userManagerSettings));
        config.container.registerInstance(OpenIdConnectConfiguration, oidcConfig);
    });
}

export {
    configure,
    OpenIdConnectRoles,
    OpenIdConnectConfiguration,
    OpenIdConnectLogger,
    OpenIdConnectRouting,
    OpenIdConnectAuthorizeStep,
    OpenIdConnect,
    // #region from oidc-client
    // todo: Can we namespace these within Oidc 
    // todo: so that referencing them involves using Oidc.UserManager, for instance?
    Log,
    User,
    UserManager,
    UserManagerSettings,
    WebStorageStateStore
    // #endregion
}
