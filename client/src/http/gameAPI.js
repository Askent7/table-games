import {$authHost, $host} from "./index";


export const createGame = async (game) => {
    const {data} = await $authHost.post('api/game', game)
    return data

}
export const updateGame = async (game, id) =>{
    const {data} = await $authHost.put('api/game/' + id, game)
    return data
}
export const deleteGame = async (id) =>{
    const {data} = await $authHost.delete('api/game/' + id)
    return data
}

export const fetchGame = async (categoryIdCategories, page, limit = 16) => {
    const {data} = await $host.get('api/game', {params:{categoryIdCategories,page,limit}})
    return data

}
export const fetchOneGame = async (id) => {
    const {data} = await $host.get('api/game/' + id)
    return data

}
export const fetchAllGame = async () => {
    const {data} = await $host.get('api/game/All')
    return data
}
export const fetchCategory = async (category) => {
    const {data} = await $host.get('api/category', category)
    return data

}
export const fetchPopular = async (page,limit = 8) => {
    const {data} = await $host.get('api/game/Popular', {params: {page,limit}})
    return data
}
export const fetchNews = async (page, limit = 4) =>{
    const {data} = await $host.get('api/game/News', {params:{page,limit}})
    return data
}
export const fetchSearch = async (search = '', limit = 5) =>{
    const{data} = await $host.get('api/game/Search', {params:{search, limit}})
    return data
}