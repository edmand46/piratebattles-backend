import { BattlesController } from "../modules/battles/controller";

export const TYPES = {
  PartsService: Symbol.for('partsService'),
  PartsManager: Symbol.for('partsManager'),

  BattlesManager: Symbol.for('battlesManager'),
  BattlesController: Symbol.for('battleController'),

  AccountsService: Symbol.for('accountService'),

  SessionsService: Symbol.for('sessionsService'),
  SessionsManager: Symbol.for('sessionsManager'),
  SessionsController: Symbol.for('sessionsController'),

  ShipsService: Symbol.for('shipsService'),
  ShipsManager: Symbol.for('shipsManager'),

  UsersService: Symbol.for('usersService'),
  UsersManager: Symbol.for('usersManager'),
  UsersController: Symbol.for('usersController'),
};