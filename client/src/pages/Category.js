import React, {useState} from "react";
import '../css/index.scss';

import Header from './Header';
import Footer from './Footer'
import ListContainer from "../components/listGameItem";

import Blob1 from "../img/Path1.svg";
import Blob2 from "../img/Path2.svg";
import Blob3 from "../img/Path3.svg";
import Blob4 from "../img/Path4.svg";
import Blob5 from "../img/Path11.svg";

import Timer from "../img/Icon ionic-ios-timer.svg";
import CheckMarkCircle from "../img/Icon ionic-ios-checkmark-circle-outline.svg";
import Percentage from "../img/percentage.svg";
import LibrarySharp from "../img/library-sharp.svg";
import Arrow from "../img/Icon ionic-ios-arrow-back.svg";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {fetchCategory, fetchGame} from "../http/gameAPI";
import {get} from "mobx";
import {useParams} from "react-router-dom";




const Category = observer(() =>  {
    const [right_arrow_container, setRight_arrow] = useState("vis right-arrow-container")
    const [left_arrow_container, setLeft_arrow] = useState("not_vis left-arrow-container")
    const [container, setContainer] = useState("container_normal Container-for-list")
    const {id} = useParams()
    const {game} = useContext(Context)
    useEffect(() => {
        fetchCategory().then(data => game.setCategories(data))
        setTimeout(() => {
        }, 1000)
        fetchGame(id,1,16).then(data => {
            game.setGames(data.rows)
            game.setTotal(data.count)
        })
    }, [])

    useEffect(()=>{
        fetchGame(id,game.page, 16).then(data => {
            game.setGames(data.rows)
            game.setTotal(data.count)
        })
    }, [game.page, id])
    function changePagePlus(){
        setContainer("container_to_left Container-for-list")

        setTimeout (() => {setContainer("container_to_right Container-for-list")},400)

        setTimeout(() => {setContainer("container_normal Container-for-list")},575)

        let page = game.page + 1;
        setTimeout(()=>{game.setPage(page)}, 300)
        setTimeout(() => {
            if(game.countTotal <= (game.page * 16)){
                setRight_arrow("not_vis right-arrow-container")
            }
            if(game.page > 1){
                setLeft_arrow("vis left-arrow-container")
            }
        },350)

    }
    function changePageMinus(){
        setContainer("container_to_right Container-for-list")

        setTimeout (() => {setContainer("container_to_left Container-for-list")},400)

        setTimeout(() => {setContainer("container_normal Container-for-list")},575)
        let page = game.page - 1;
        setTimeout(()=>{game.setPage(page)}, 300)
        setTimeout(() => {
            if(game.countTotal >= (game.page * 8)){
                setRight_arrow("vis right-arrow-container")
            }
            if(game.page === 1){
                setLeft_arrow("not_vis left-arrow-container")
            }
        },350)

    }


    const [category, setCategory] = useState('');
    setTimeout(() => {
        setCategory((get(game.categories, (id - 1))).name_category)
    }, 100)


    return (

        <div>
            <Header/>

            <div className="Banner">

                <img className="Banner-Blob" src={Blob1}></img>
                <img className="Banner-Blob2" src={Blob2}></img>
                <div className="Banner-Container">
                    <div className="Banner-Name">НЕМЕЗИДА</div>
                    <div className="Banner-Sub-Name">КАРНОМОРФЫ</div>
                    <div className="Banner-text">
                        Всё произошло из-за одной-единственной кошки. Должно быть, она пробралась на борт во время нашей встречи с научным кораблём "Адрастея". Забрав нужные нам образцы, мы совершили обратный гиперпрыжок, и все благополучно уснули. Все, кроме кошки. Даже девять жизней не могли её спасти.
                    </div>
                    <button className="Banner-Button">В корзину</button>
                </div>

                <div className="Banner-Glass"></div>
            </div>
            <div className="Container">
                <div className="Container-Headlines">
                    <div className="Container-Headlines-Name">{category}</div>
                    <div className="Container-UnderText"></div>
                    <img className="Container-Blob3" src={Blob3}></img>
                    <div className="Container-Container" id="News">
                        <img onClick={changePageMinus} className={left_arrow_container} src={Arrow} ></img>
                        <div className={container}>
                            {game.games.map(game => <ListContainer key={game.id_product} game={game}/>)}
                        </div>

                        <img onClick={changePagePlus} className={right_arrow_container} src={Arrow}></img>
                    </div>

                </div>
                <Footer/>
            </div>




        </div>
    );
})

export default Category;