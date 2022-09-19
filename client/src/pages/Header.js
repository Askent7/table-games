import React, {useState} from "react";
import '../css/Header.scss';
import '../css/AnimationHeader.scss'
import AddCart from '../img/add-shopping-cart.svg'
import Logo from '../img/BoardGameBar.svg';
import DownArrow from '../img/Icon material-keyboard-arrow-down.svg';
import Basket from '../img/basket-outline.svg';
import Profile from '../img/profile_2.svg';
import Cancel from '../img/cancel.svg';
import Search from '../img/Icon ionic-ios-search.svg'
import {Link, useNavigate} from 'react-router-dom';
import Arrow from "../img/Icon ionic-ios-arrow-back.svg";
import {CSSTransition} from 'react-transition-group';
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {fetchCategory, fetchSearch} from "../http/gameAPI";
import {MAIN_ROUTE} from "../utils/const";
/*
$$\   $$\                           $$\
$$ |  $$ |                          $$ |
$$ |  $$ | $$$$$$\   $$$$$$\   $$$$$$$ | $$$$$$\   $$$$$$\
$$$$$$$$ |$$  __$$\  \____$$\ $$  __$$ |$$  __$$\ $$  __$$\
$$  __$$ |$$$$$$$$ | $$$$$$$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|
$$ |  $$ |$$   ____|$$  __$$ |$$ |  $$ |$$   ____|$$ |
$$ |  $$ |\$$$$$$$\ \$$$$$$$ |\$$$$$$$ |\$$$$$$$\ $$ |
\__|  \__| \_______| \_______| \_______| \_______|\__|
*/


var flagBasket = new Boolean(false);



const Header = observer(() =>{
    const {game} = useContext(Context)

    useEffect(() => {
        fetchCategory().then(data => game.setCategories(data))
    }, [])
    return(
        <div className="Header">
            <div className="Header-Bg"></div>
            <Link to={MAIN_ROUTE}><img className="Logo" src={Logo} /></Link>

                <div id="search-Nav">
                    <NavSearch >
                        <DropdownMenuSearch></DropdownMenuSearch>
                    </NavSearch>
                </div>


                <NavCat>
                    <DropdownMenu/>
                </NavCat>


            <NavBasket>
                <DropdownBasket/>
            </NavBasket>

            <NavProf>
                <DropdownProfile/>
            </NavProf>



        </div>

    );
})

var searchVal = ''

function NavSearch(props){
    const[open, setOpen] = useState(false);
    var value = "";


/*

$$\   $$\  $$$$$$\         $$$$$$\  $$\   $$\  $$$$$$\  $$\   $$\  $$$$$$\  $$$$$$$$\ $$\
$$$\  $$ |$$  __$$\       $$  __$$\ $$ |  $$ |$$  __$$\ $$$\  $$ |$$  __$$\ $$  _____|$$ |
$$$$\ $$ |$$ /  $$ |      $$ /  \__|$$ |  $$ |$$ /  $$ |$$$$\ $$ |$$ /  \__|$$ |      $$ |
$$ $$\$$ |$$ |  $$ |      $$ |      $$$$$$$$ |$$$$$$$$ |$$ $$\$$ |$$ |$$$$\ $$$$$\    $$ |
$$ \$$$$ |$$ |  $$ |      $$ |      $$  __$$ |$$  __$$ |$$ \$$$$ |$$ |\_$$ |$$  __|   \__|
$$ |\$$$ |$$ |  $$ |      $$ |  $$\ $$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |  $$ |$$ |
$$ | \$$ | $$$$$$  |      \$$$$$$  |$$ |  $$ |$$ |  $$ |$$ | \$$ |\$$$$$$  |$$$$$$$$\ $$\
\__|  \__| \______/        \______/ \__|  \__|\__|  \__|\__|  \__| \______/ \________|\__|


*/

    var flag = new Boolean(false);

    function Check() {
        value = document.getElementById("site-search").value;
        searchVal = value

        if (value === "" && flag) {
            setOpen(!open);
            flag = false;
            DropCSS_Search  = "fade-out dropdown-search"
        }
        else if(flag) {
            setOpen(!open);
            setOpen(flag);
            DropCSS_Search = "fade-in dropdown-search"

        }

    }


   return(
        <div>
            <img src={Search} className="Search-Icon"/>
            <div className="search-cont" >

                <CSSTransition in={open}
                               timeout={200}
                               classNames="DropAnim"
                               onEntering={() => setOpen(open)}
                               onExited={() => setOpen(open)}
                >{props.children}</CSSTransition>
                <div><input onInput={Check}  autoComplete="off" type="search" id="site-search" name="q" placeholder="Поиск..."></input></div>


            </div>
        </div>
    );

};

const DropdownItemSearch = ({game}) =>{
    {

        return (
            <div>
                <img src={game.little_picture} className="menu-search-img"></img>
                <div className="menu-search-name">{game.game_name}</div>
                <div className="menu-search-subname">{game.little_description}</div>
                <img src={AddCart} className="AddCard"/>
                <div className="menu-search-price">{game.price}</div>

                <div className="menu-search-line"></div>
            </div>
        );
    }
    ;
}





function DropdownMenuSearch(){
    const {search} = useContext(Context)

    useEffect(() => {
        if(searchVal === ""){}
        else {

            fetchSearch(searchVal).then(data =>{
                search.setGames(data.rows)
                search.setTotal(data.count)}
            )
        }
    },[searchVal])
    return(

        <div className={DropCSS_Search}>
            {
                search.countTotal > 0 ? <div>{search.games.map(game => <DropdownItemSearch key={game.id_product} game={game}/>)}</div> :  <div className="searchOpps">#Oppps. Ничего не найдено. </div>
            }
        </div>

    );

}

var DropCSS = "fade-out dropdown";
var DropCSS_Search = "fade-out dropdown-search";
var DropCSS_Basket = "fade-out BasketVoidDrop";

var DropCSS_Profile = "fade-out dropdown-profile"


var Arr = "DownArrow";
var flagClose = false;
var flagClose2 = false
function NavCat(props){
/*
    $$\   $$\  $$$$$$\         $$$$$$\  $$\   $$\  $$$$$$\  $$\   $$\  $$$$$$\  $$$$$$$$\       $$\   $$\  $$$$$$\  $$\
    $$$\  $$ |$$  __$$\       $$  __$$\ $$ |  $$ |$$  __$$\ $$$\  $$ |$$  __$$\ $$  _____|      $$ |  $$ |$$  __$$\ $$ |
    $$$$\ $$ |$$ /  $$ |      $$ /  \__|$$ |  $$ |$$ /  $$ |$$$$\ $$ |$$ /  \__|$$ |            \$$\ $$  |\__/  $$ |$$ |
    $$ $$\$$ |$$ |  $$ |      $$ |      $$$$$$$$ |$$$$$$$$ |$$ $$\$$ |$$ |$$$$\ $$$$$\           \$$$$  /  $$$$$$  |$$ |
    $$ \$$$$ |$$ |  $$ |      $$ |      $$  __$$ |$$  __$$ |$$ \$$$$ |$$ |\_$$ |$$  __|          $$  $$<  $$  ____/ \__|
    $$ |\$$$ |$$ |  $$ |      $$ |  $$\ $$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |  $$ |$$ |            $$  /\$$\ $$ |
    $$ | \$$ | $$$$$$  |      \$$$$$$  |$$ |  $$ |$$ |  $$ |$$ | \$$ |\$$$$$$  |$$$$$$$$\       $$ /  $$ |$$$$$$$$\ $$\
    \__|  \__| \______/        \______/ \__|  \__|\__|  \__|\__|  \__| \______/ \________|      \__|  \__|\________|\__|

 */

    const[open, setOpen] = useState(false);
    function Hide(){


        flagClose = false;
        Arr = "DownArrow";
        DropCSS = "fade-out dropdown";
        setOpen(flagClose)

    }
    function Open(){

        if(flagClose){
            DropCSS = "fade-out dropdown";

            Arr = "DownArrow";
            setOpen(!flagClose);
            flagClose = false;
        }
        else{
            DropCSS = "fade-in dropdown";

            Arr = "UpArrow";

            setOpen(!flagClose);
            flagClose = true;
        }
    }

    return(
        <div className="Category" >
            <div className="FakeHeader">

                <CSSTransition in={!open}
                               timeout={200}
                               classNames="DropAnim"
                ><div onPointerLeave={Hide} className={DropCSS}>{props.children}</div></CSSTransition></div>
            <div><div onClick={Open}>

                Все категории
                <img className={Arr} src={DownArrow}/>
            </div></div>



        </div>
    );
};

function DropdownItem(props){
    return(
        <div className="menu-item">
            {props.children}
        </div>
    );
}
const DropdownMenu = observer(() => {
    const {game} = useContext(Context)
    useEffect(() => {
        fetchCategory().then(data => game.setCategories(data))
    }, [])
    return(

        <div>
            {game.categories.map(category => <DropdownItem><Link className="no_decor" to={MAIN_ROUTE + category.id_categories}>#{category.name_category}</Link></DropdownItem>)}
        </div>


    );

})

function NavBasket(props){

   /* $$\   $$\  $$$$$$\         $$$$$$\  $$\   $$\  $$$$$$\  $$\   $$\  $$$$$$\  $$$$$$$$\       $$\   $$\  $$$$$$\  $$\ $$\
    $$$\  $$ |$$  __$$\       $$  __$$\ $$ |  $$ |$$  __$$\ $$$\  $$ |$$  __$$\ $$  _____|      $$ |  $$ |$$ ___$$\ $$ |$$ |
    $$$$\ $$ |$$ /  $$ |      $$ /  \__|$$ |  $$ |$$ /  $$ |$$$$\ $$ |$$ /  \__|$$ |            \$$\ $$  |\_/   $$ |$$ |$$ |
    $$ $$\$$ |$$ |  $$ |      $$ |      $$$$$$$$ |$$$$$$$$ |$$ $$\$$ |$$ |$$$$\ $$$$$\           \$$$$  /   $$$$$ / $$ |$$ |
    $$ \$$$$ |$$ |  $$ |      $$ |      $$  __$$ |$$  __$$ |$$ \$$$$ |$$ |\_$$ |$$  __|          $$  $$<    \___$$\ \__|\__|
    $$ |\$$$ |$$ |  $$ |      $$ |  $$\ $$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |  $$ |$$ |            $$  /\$$\ $$\   $$ |
    $$ | \$$ | $$$$$$  |      \$$$$$$  |$$ |  $$ |$$ |  $$ |$$ | \$$ |\$$$$$$  |$$$$$$$$\       $$ /  $$ |\$$$$$$  |$$\ $$\
    \__|  \__| \______/        \______/ \__|  \__|\__|  \__|\__|  \__| \______/ \________|      \__|  \__| \______/ \__|\__|
*/


    const [open, setOpen] = useState(false);

    function Hide(){


        flagClose = false;

        DropCSS_Basket = "fade-out BasketVoidDrop";
        setOpen(flagClose)

    }
    function Open(){

        if(flagClose){

            DropCSS_Basket = "fade-out BasketVoidDrop";


            setOpen(!flagClose);
            flagClose = false;
        }
        else{

            DropCSS_Basket = "fade-in BasketVoidDrop";


            setOpen(!flagClose);
            flagClose = true;
        }
    }

 return(
     <div  className="Basket">

            <div>

                <div className="FakeHeader2">
                    <CSSTransition in={!open}
                               timeout={200}
                               classNames="DropAnim"
                               onEntering={() => setOpen(open)}
                               onExited={() => setOpen(open)}
                ><div onPointerLeave={Hide}   className={DropCSS_Basket}>{props.children}</div></CSSTransition></div>
                <img onClick={Open}  src={Basket}/>


            </div>

        </div>
    );
};

function DropdownBasketVoid() {
    return (
        <div>
            <div className="Oooops-Text">#Ooops</div>
            <div className="BasketVoidDrop-Void-Text">Кажется ваша корзина пуста</div>
            <div className="BasketVoidDrop-sub-text">Добавьте хотя бы один товар, чтобы сделать заказ</div>


            <div className="BasketVoidDrop-Container-back-button">
                <img id="BasketVoidDrop-Arrow-back" src={Arrow}></img>
                <div className="BasketVoidDrop-back-text">Вернуться назад</div>
            </div>
        </div>


    );
}
function DropdownBasket(){
    return(
        <div className="dropdown-basket-cot">
            <div className="dropdown-basket-container">
                <DropdownBasketItem/>
                <DropdownBasketItem/>

                <div className="dropdown-basket-dash-line"></div>
                <div className="dropdown-basket-dash-line-text-cont">
                    <div className="dropdown-basket-dash-line-under-text">Итого</div><div id="Price" className="dropdown-basket-dash-line-under-text">24999р</div>
                </div>
                <div className="BasketVoidDrop-Container-back-button">

                    <div className="BasketVoidDrop-back-text">Оформить заказ</div>
                    <img id="BasketDrop-Arrow-back" src={Arrow}></img>
                </div>
            </div>

        </div>

    );
}
function DropdownBasketItem(){
    return(
      <div  className="dropdown-basket-container-item">
        <div className="dropdown-basket-img"></div>
          <div className="dropdown-basket-name">Немезис</div>
          <div className="dropdown-basket-price">6999р</div>
          <div className="dropdown-basket-counter"><div  className="dropdown-basket-counter-symbol"> -</div ><div className="dropdown-basket-counter-symbol">2</div><div className="dropdown-basket-counter-symbol">+</div> </div>
            <img src={Cancel} className="dropdown-basket-cancel"/>
            <div className="dropdown-basket-line"></div>
      </div>


    );
}


function NavProf(props){

    const[open, setOpen] = useState(false);
    function Hide(){
        flagClose = false;
        DropCSS_Profile = "fade-out dropdown-profile";
        setOpen(flagClose)

    }
    function Open(){

        if(flagClose){
            DropCSS_Profile = "fade-out dropdown-profile";
            setOpen(!flagClose);
            flagClose = false;
        }
        else{
            DropCSS_Profile = "fade-in dropdown-profile";
            setOpen(!flagClose);
            flagClose = true;
        }
    }

    return(
        <div className="Profile" >
            <div className="FakeHeader">

                <CSSTransition in={!open}
                               timeout={200}
                               classNames="DropAnim"
                ><div onPointerLeave={Hide} className={DropCSS_Profile}>{props.children}</div></CSSTransition></div>
            <img onClick={Open} src={Profile}/>



        </div>
    );
};
function DropdownProfile(){
    return(
        <div className="dropdown-profile-cot">
            <div className="dropdown-profile-container">
                <input type="text" id="login" className="profile-input" placeholder="E-mail"/>
                <input type="password" id="login" className="profile-input" placeholder="Пароль"/>
                <div className="profile-container-back-button">

                    <div className="BasketVoidDrop-back-text">Войти</div>
                    <img id="BasketDrop-Arrow-back" src={Arrow}></img>
                </div>
                <div className="RegisterButton">Нет аккаунта? Зарегистрироваться!</div>
            </div>

        </div>

    );
}



export default Header