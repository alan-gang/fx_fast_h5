import { observable, action, runInAction } from "mobx";
import { Game } from '../typings/games';
import Types from './types';
import local from '../utils/local';
import APIs from '../http/APIs';

class MyGame {
  @observable favourites: Game[] = local.get(Types.SET_PC_FAVOURITE_GAMES) || [];
  // @observable limitLevel: number = 1; // 限红级别
  @observable limitLevelList: LimitLevelItem[] = [];
  @observable limitList: LimitListItem[] = local.get(Types.LOCAL_PC_FAST_SET_LIMIT_LIST) || []; // 限红
  @observable setGamesLimitLevel: GameLimitLevel[] = local.get(Types.LOCAL_PC_FAST_SET_GAMES_LIMIT_LEVEL) || [];
  @observable availableGames: number[] = [];

  hasGame(id: number): boolean {
    return !!this.favourites.find((game: Game) => game.id === id);
  }

  @action
  setFavourite(game: Game) {
    if (this.hasGame(game.id)) return null;
    this.favourites.push(game);
    local.set(Types.SET_PC_FAVOURITE_GAMES, this.favourites);
  }

  @action
  removeFavourite(id: number) {
    if (id < 0) return null;
    for (let i = 0; i < this.favourites.length; i++) {
      if (id === this.favourites[i].id) {
        this.favourites.splice(i, 1);
        break;
      }
    }
    local.set(Types.SET_PC_FAVOURITE_GAMES, this.favourites);
  }

  @action
  clearFavourites() {
    this.favourites = [];
    local.set(Types.SET_PC_FAVOURITE_GAMES, this.favourites);
  }

  // 根据ID获取限红项
  @action
  getLimitListItemById(id: number): LimitListItem | undefined {
    return this.limitList.find((item: LimitListItem) => id === item.id );
  }

  @action
  updateLimitListItem(item: LimitListItem) {
    for (let i = 0; i < this.limitList.length; i++) {
      if (item.id === this.limitList[i].id) {
        this.limitList[i] = item;
        break;
      }
    }
  }

  @action
  setLimitList(items: LimitListItem[]) {
    if (!items) return;
    items.forEach((item: LimitListItem) => {
      if (this.getLimitListItemById(item.id)) {
        this.updateLimitListItem(item);
      } else {
        this.limitList.push(item);
      }
    });
    local.set(Types.LOCAL_PC_FAST_SET_LIMIT_LIST, this.limitList);
  }
  
  @action
  setLimitLevelList(limitLevels: LimitLevelItem[]) {
    this.limitLevelList = limitLevels;
  }

  @action
  getGameLimitLevelByGameId(gameId: number): GameLimitLevel | undefined {
    return this.setGamesLimitLevel.find(gll => gll.gameId === gameId);
  }

  @action
  updateGamesLimitLevel(gameLimitLevel: GameLimitLevel) {
    let gll = this.getGameLimitLevelByGameId(gameLimitLevel.gameId);
    if (gll) {
      let index = this.setGamesLimitLevel.findIndex(gll => gll.gameId === gameLimitLevel.gameId);
      this.setGamesLimitLevel.splice(index, 1, gameLimitLevel);
    } else {
      this.setGamesLimitLevel.push(gameLimitLevel);
    }
    local.set(Types.LOCAL_PC_FAST_SET_GAMES_LIMIT_LEVEL, this.setGamesLimitLevel);
  }

  @action
  hasAvailableGame(gameId: number) {
    return this.availableGames.includes(gameId);
  }

  @action
  updateAvailableGames() {
    APIs.getLotterys().then((data: any) => {
      if (data.lotteryList) {
        runInAction(() => {
          this.availableGames = data.lotteryList.map((game: any) => game.lotteryId);
        })
      }
    });
  }

  @action
  getAvailableGames(callback?: Function) {
    if (this.availableGames.length > 0) {
      callback && callback(this.availableGames.slice(0));
      return;
    }
    APIs.getLotterys().then((data: any) => {
      if (data.lotteryList) {
        runInAction(() => {
          this.availableGames = data.lotteryList.map((game: any) => game.lotteryId);
          callback && callback(this.availableGames.slice(0));
        })
      }
    });
  }
}

export default new MyGame;
