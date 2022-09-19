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
import {fetchCategory, fetchNews, fetchPopular} from "../http/gameAPI";
/*
$$\      $$\           $$\
$$$\    $$$ |          \__|
$$$$\  $$$$ | $$$$$$\  $$\ $$$$$$$\
$$\$$\$$ $$ | \____$$\ $$ |$$  __$$\
$$ \$$$  $$ | $$$$$$$ |$$ |$$ |  $$ |
$$ |\$  /$$ |$$  __$$ |$$ |$$ |  $$ |
$$ | \_/ $$ |\$$$$$$$ |$$ |$$ |  $$ |
\__|     \__| \_______|\__|\__|  \__|
*/




const Main = observer(() =>  {
    const [right_arrow_container, setRight_arrow] = useState("vis right-arrow-container")
    const [left_arrow_container, setLeft_arrow] = useState("not_vis left-arrow-container")
    const [right_arrow_container_news, setRight_arrowNews] = useState("vis right-arrow-container")
    const [left_arrow_container_news, setLeft_arrowNews] = useState("not_vis left-arrow-container")
    const [container_news, setContainer_news] = useState("container_normal Container-for-list")
    const [container_popular, setContainer_popular] = useState("container_normal Container-for-list")

    const {game} = useContext(Context)
    const {popular} = useContext(Context)
    useEffect(() => {
        fetchCategory().then(data => game.setCategories(data))
        setTimeout(() => {
        }, 700)
        fetchNews(1, 4).then(data => {
            game.setGames(data.rows)
            game.setTotal(data.count)
        })
        fetchPopular(1,8).then(data => {
            popular.setGames(data.rows)
            popular.setTotal(data.count)
        })
    }, [])
    useEffect(()=> {
        fetchPopular(popular.page,8).then(data => {
            popular.setGames(data.rows)
            popular.setTotal(data.count)
        })
    },[popular.page])
    useEffect(()=>{
        fetchNews(game.page, 4).then(data => {
            game.setGames(data.rows)
            game.setTotal(data.count)
        })
    }, [game.page])
    function changePagePlus(){
        setContainer_popular("container_to_left Container-for-list")

        setTimeout (() => {setContainer_popular("container_to_right Container-for-list")},400)

        setTimeout(() => {setContainer_popular("container_normal Container-for-list")},575)

        let page = popular.page + 1;
        setTimeout(()=>{popular.setPage(page)}, 300)
        setTimeout(() => {
            if(popular.countTotal <= (popular.page * 8)){
                setRight_arrow("not_vis right-arrow-container")
            }
            if(popular.page > 1){
                setLeft_arrow("vis left-arrow-container")
            }
        },350)

    }
    function changePageMinus(){
        setContainer_popular("container_to_right Container-for-list")

        setTimeout (() => {setContainer_popular("container_to_left Container-for-list")},400)

        setTimeout(() => {setContainer_popular("container_normal Container-for-list")},575)
        let page = popular.page - 1;
        setTimeout(()=>{popular.setPage(page)}, 300)
        setTimeout(() => {
            if(popular.countTotal >= (popular.page * 8)){
                setRight_arrow("vis right-arrow-container")
            }
            if(popular.page === 1){
                setLeft_arrow("not_vis left-arrow-container")
            }
        },350)

    }
    function changePagePlusNews(){
        setContainer_news("container_to_left Container-for-list")

        setTimeout (() => {setContainer_news("container_to_right Container-for-list")},400)

        setTimeout(() => {setContainer_news("container_normal Container-for-list")},575)

        let page = game.page + 1;
        setTimeout(() => {game.setPage(page)},300)
        setTimeout(() => {
            if(20 <= (game.page * 4)){
                setRight_arrowNews("not_vis right-arrow-container")
            }
            if(game.page > 1){
                setLeft_arrowNews("vis left-arrow-container")
            }
        },350)




    }
    function changePageMinusNews(){
        setContainer_news("container_to_right Container-for-list")

        setTimeout (() => {setContainer_news("container_to_left Container-for-list")},400)

        setTimeout(() => {setContainer_news("container_normal Container-for-list")},575)
        let page = game.page - 1;
        setTimeout(() => {
            game.setPage(page)
        },300)
        setTimeout(() => {
            if(game.countTotal >= (game.page * 4)){
                setRight_arrowNews("vis right-arrow-container")
            }
            if(game.page === 1){
                setLeft_arrowNews("not_vis left-arrow-container")
            }
        }, 350)


    }
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
                 <div className="Container-Headlines-Name">Новинки</div>
                <div className="Container-UnderText"></div>
                 <img className="Container-Blob3" src={Blob3}></img>
                 <div className="Container-Container" id="News">
                    <img onClick={changePageMinusNews} className={left_arrow_container_news} src={Arrow} ></img>
                     <div className={container_news}>
                         {game.games.map(game => <ListContainer key={game.id_product} game={game}/>)}
                     </div>

                     <img onClick={changePagePlusNews} className={right_arrow_container_news} src={Arrow}></img>
                 </div>

            </div>

             <div className="Container-Headlines">
                 <div className="Container-Headlines-Name">Популярное</div>
                 <div className="Container-UnderText" id="UnderTextPopular"></div>
                 <img className="Container-Blob4" src={Blob4}></img>
                 <div className="Container-Container" id="Popular">
                     <img onClick={changePageMinus} className={left_arrow_container} src={Arrow} ></img>
                     <div className={container_popular}>
                         {popular.games.map(game => <ListContainer key={game.id_product} game={game}/>)}

                     </div>

                     <img onClick={changePagePlus} className={right_arrow_container} src={Arrow} ></img>
                 </div>

             </div>

             <div className="Container-Headlines">
                 <div className="Container-Headlines-Name">Почему мы</div>
                 <div className="Container-UnderText" id="UnderTextWe"></div>
                 <img className="Container-Blob5" src={Blob5}></img>
                 <div className="Container-Container" id="We">
                     <div className="Container-for-list">
                         <div className="list-container-why-we">
                             <img className="list-container-why-we-img"  src={Timer}></img>
                             <div className="list-container-why-we-name">Быстрая доставка</div>
                             <div className="list-container-why-we-sub-name">Мы оперативно доставим настольные игры по России и по всему миру удобным Вам способом</div>
                         </div>
                         <div className="list-container-why-we">
                             <img className="list-container-why-we-img" src={CheckMarkCircle}></img>
                             <div className="list-container-why-we-name">Гарантия качества</div>
                             <div className="list-container-why-we-sub-name">Мы в #BoardGameBar гордимся качеством предоставляемых нами игр</div>
                         </div>
                         <div className="list-container-why-we">
                             <img className="list-container-why-we-img" src={Percentage}></img>
                             <div className="list-container-why-we-name">Акции и Скидки</div>
                             <div className="list-container-why-we-sub-name">Для наших клиентов действует система накопительных скидок и бонусных баллов</div>
                         </div>
                         <div className="list-container-why-we">
                             <img className="list-container-why-we-img" src={LibrarySharp} id="Shirok"></img>
                             <div className="list-container-why-we-name" >Широкий ассортимент</div>
                             <div className="list-container-why-we-sub-name">Для наших клиентов действует система накопительных скидок и бонусных баллов</div>
                         </div>
                     </div>

                 </div>

             </div>
             <Footer/>
         </div>



      </div>
  );
})

export default Main;