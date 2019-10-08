import { Container } from "inversify";
import { TYPES } from "./types";
import { AccountsService } from "../modules/accounts/service";
import { UsersManager } from "../modules/users/manager";
import { UsersService } from "../modules/users/service";
import { UsersController } from "../modules/users/controller";

const appContainer = new Container();
appContainer.bind<AccountsService>(TYPES.AccountsService).to(AccountsService);
appContainer.bind<UsersManager>(TYPES.UsersManager).to(UsersManager);
appContainer.bind<UsersService>(TYPES.UsersService).to(UsersService);
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);

export { appContainer };