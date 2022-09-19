import React from "react";
import '../css/Footer.scss';
import Logo2 from '../img/BoardGameBar-1.svg'
/*
$$$$$$$$\                   $$\
$$  _____|                  $$ |
$$ |    $$$$$$\   $$$$$$\ $$$$$$\    $$$$$$\   $$$$$$\
$$$$$\ $$  __$$\ $$  __$$\\_$$  _|  $$  __$$\ $$  __$$\
$$  __|$$ /  $$ |$$ /  $$ | $$ |    $$$$$$$$ |$$ |  \__|
$$ |   $$ |  $$ |$$ |  $$ | $$ |$$\ $$   ____|$$ |
$$ |   \$$$$$$  |\$$$$$$  | \$$$$  |\$$$$$$$\ $$ |
\__|    \______/  \______/   \____/  \_______|\__|
*/


const Footer = () =>{
    return(
        <div className="Footer">
        <div className="Footer-Cont">
            <div className="Cont-List">
                <div className="List-Name">boardgamebar</div>
                <div className="List-Sub-Item">О нас</div>
                <div className="List-Sub-Item">О нас</div>
                <div className="List-Sub-Item">О нас</div>
            </div>
            <div className="Cont-List">
                <div className="List-Name">покупателям</div>
                <div className="List-Sub-Item">О нас</div>
                <div className="List-Sub-Item">О нас</div>
                <div className="List-Sub-Item">О нас</div>
            </div>
            <div className="Cont-List">
                <div className="List-Name">доставка и оплата</div>
                <div className="List-Sub-Item">О нас</div>
                <div className="List-Sub-Item">О нас</div>
                <div className="List-Sub-Item">О нас</div>
            </div>

            <div className="line"></div>

            <img src={Logo2} className="Logo2"/>
            <div className="Copyright">
                Копирование материалов разрешено только по согласию администрации Содержимое сайта не является публичной офертой
            </div>
            <div className="Copy-Links">Политика конфиденциальности</div>
            <div className="Copy-Links">Публичная оферта</div>
        </div>
        </div>
    );
}

export default Footer