import {makeAutoObservable} from "mobx";

export default class gameStorage{
    constructor() {
        this._categories = []
        this._games = []
        this._page = 1
        this._limit = 8
        this._countTotal = 0
        makeAutoObservable(this)
    }

    setCategories(categories){
        this._categories = categories
    }
    setGames(games){
        this._games = games
    }
    setPage(page){
        this._page = page
    }
    setTotal(total){
        this._countTotal = total
    }
    get categories(){
        return this._categories
    }
    get games(){
        return this._games
    }
    get page(){
        return this._page
    }
    get countTotal(){
        return this._countTotal
    }
    get limit(){
        return this._limit
    }

}