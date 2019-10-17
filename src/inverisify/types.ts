import { ShipsController } from "../modules/ships/controller";

export const TYPES = {
  PartsService: Symbol.for('partsService'),
  PartsManager: Symbol.for('partsManager'),

  BattlesManager: Symbol.for('battlesManager'),
  BattlesController: Symbol.for('battleController'),

  ChestsController: Symbol.for('chestsController'),
  ChestsService: Symbol.for('chestsService'),
  ChestsManager: Symbol.for('chestsManager'),

  AccountsService: Symbol.for('accountService'),

  SessionsService: Symbol.for('sessionsService'),
  SessionsManager: Symbol.for('sessionsManager'),

  ShipsService: Symbol.for('shipsService'),
  ShipsManager: Symbol.for('shipsManager'),
  ShipsController: Symbol.for('shipsController'),

  UsersService: Symbol.for('usersService'),
  UsersManager: Symbol.for('usersManager'),
  UsersController: Symbol.for('usersController'),
};