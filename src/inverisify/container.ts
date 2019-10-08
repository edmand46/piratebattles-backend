import { Container } from "inversify";
import { TYPES } from "./types";
import { AccountsService } from "../modules/accounts/service";
import { UsersManager } from "../modules/users/manager";
import { UsersService } from "../modules/users/service";
import { UsersController } from "../modules/users/controller";
import { SessionsManager } from "../modules/sessions/manager";
import { SessionsService } from "../modules/sessions/service";
import { ShipsManager } from "../modules/ships/manager";
import { ShipsService } from "../modules/ships/service";

const appContainer = new Container();
appContainer.bind<AccountsService>(TYPES.AccountsService).to(AccountsService);
// appContainer.bind<AccountMana>(TYPES.AccountsService).to(AccountsService);

appContainer.bind<UsersManager>(TYPES.UsersManager).to(UsersManager);
appContainer.bind<UsersService>(TYPES.UsersService).to(UsersService);
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);

appContainer.bind<SessionsManager>(TYPES.SessionsManager).to(SessionsManager);
appContainer.bind<SessionsService>(TYPES.SessionsService).to(SessionsService);

appContainer.bind<ShipsManager>(TYPES.ShipsManager).to(ShipsManager);
appContainer.bind<ShipsService>(TYPES.ShipsService).to(ShipsService);


export { appContainer };