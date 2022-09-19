import React, {useEffect} from "react";
import '../css/App.css';
import Button from '@mui/material/Button';
import {Autocomplete} from '@mui/material';
import {Checkbox} from "@mui/material";
import {TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid"
import {Stack} from "@mui/material";
import {useContext, useState} from "react";
import {Context} from "../index";
import {updateGame, fetchCategory, fetchOneGame} from "../http/gameAPI";
import {useNavigate, useParams} from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {get, values} from 'mobx'
import {TABLE_ROUTE} from "../utils/const";



const options = [

    {label: 'Для компании', id:1},
    {label: 'Для всей семьи', id:2},
    {label: 'Для детей', id: 3},
    {label: 'Детективные игры', id: 4},
    {label: 'Ролевые игры', id: 5},
    {label: 'Хардкорные игры', id: 6},
    {label: 'Дуэльные игры', id: 7},
    {label: 'Стратегические игры', id:8},
    {label: 'Экономические игры', id:9},
    {label: 'Кооперативные игры', id:10}

]

const optionsRating = [
    { label: '3+', id:1},
    {label: '6+', id:2},
    {label: '8+', id: 3},
    {label: '13+', id: 4},
    {label: '16+', id: 5},
    {label: '18+', id: 6},
]

const optionsPlayers = [
    { label: '1-2', id:1},
    { label: '2-4', id:2},
    { label: '4-8', id:3},
    {label: '1-4', id:4},
    {label: '1-5', id:5},
    {label: '1-6', id:6},
    {label: '2-5', id:7},
    {label: '2-6', id:8},
    {label: '4-6', id:9},
    {label: '2-12', id:10},
    {label: '4-12', id:11},
]

const optionsTime = [
    { label: 'до 15 минут', id:1},
    { label: '16-30 минут', id:2},
    { label: '31-60 минут', id:3},
    { label: '61-120 минут', id:4},
    { label: 'от 2 часов', id:5},
]



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Change = () => {
    const [game, setGame] = useState({})
    const {id} = useParams()



    useEffect(() => {

        fetchOneGame(id).then(data => setGame(data))
    },[])

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const [error, setError] = useState('')

    const nav = useNavigate()


    const [name, setName] = useState('')
    const [litDescription, setLitDescription] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState()
    const [roollink, setRoollink] = useState('')
    const [category, setCategory] = useState()
    const [miniImg, setMiniImg] = useState('')
    const [img, setImg] = useState('')
    const [age, setAge] = useState('')
    const [players, setPlayers] = useState('')
    const [time, setTime] = useState('')
    const [popular, setPopular] = useState(false)

    const AddGame = () => {
        const formData = new FormData()
        if (name === '') {
            setError('Введи название!')
            handleClick()
        } else if (litDescription === '') {
            setError('Введи короткое описание!')
            handleClick()
        } else if (description === '') {
            setError('Введи описание!')
            handleClick()
        } else if (price === 0 || price === undefined) {
            setError('Введи цену!')
            handleClick()
        } else if (category === undefined) {
            setError('Введи категорию!')
            handleClick()
        } else if (miniImg === '') {
            setError('Добавь мини-картинку!')
            handleClick()
        } else if (img === '') {
            setError('Добавь картинки!')
            handleClick()
        } else if (age === '') {
            setError('Добавь возраст!')
            handleClick()
        } else if (players === '') {
            setError('Добавь кол-во игроков!')
            handleClick()
        } else if (time === '') {
            setError('Добавь продолжительность!')
            handleClick()
        } else {
            formData.append('game_name', name)
            formData.append('little_description', litDescription)
            formData.append('description', description)
            formData.append('price', `${price}`)
            formData.append('rool_link', roollink)
            formData.append('categoryIdCategories', category)
            formData.append('little_picture', miniImg)
            formData.append('mas_pictures', img)
            formData.append('age_rating', age)
            formData.append('players_number', players)
            formData.append('game_time', time)
            formData.append('popular', popular)
            updateGame(formData, id).then(data => nav(TABLE_ROUTE))
        }
    }
    useEffect(() =>{
        setName(game.game_name)
        setLitDescription(game.little_description)
        setDescription(game.description)
        setPrice(game.price)
        setRoollink(game.rool_link)
        setMiniImg(game.little_picture)
        setImg(game.mas_pictures)
        setAge(game.age_rating)
        setPlayers(game.players_number)
        setTime(game.game_time)
        setPopular(game.popular)
        }, [game]
    )


      return (





    <div className="Padding">
      <Stack spacing={3}  justifyContent="center"
             alignItems="center">
          <TextField value={name} onChange={e => setName(e.target.value)} size="small" sx={{ width: 800}} id="Game-Name" label="Название игры" variant="filled" />
          <TextField value={litDescription} onChange={e => setLitDescription(e.target.value)} size="small" sx={{ width: 800 }} id="Short-Description" label="Кароткое описание" variant="filled" />
          <TextField value={description} onChange={e => setDescription(e.target.value)} size="small" sx={{ width: 800 }} multiline rows={20} id="Full-Description" label="Полное описание" variant="filled" />
          <TextField value={price} onChange={e => setPrice(Number(e.target.value))} size="small" sx={{ width: 800 }} id="Price" label="Цена" variant="filled" />
          <TextField value={roollink} onChange={e => setRoollink(e.target.value)} size="small" sx={{ width: 800 }} id="Rules" label="Правила-ссылка" variant="filled" />
          <Autocomplete
              value={category}
              onChange={(event, newValue) => setCategory(newValue.id)}
              disablePortal
              id="Category-List"
              size="small"
              options={options}
              sx={{ width: 800 }}
              renderInput={(params) => <TextField {...params} label="Категория" />}
          />
          <TextField value={miniImg}  onChange={e => setMiniImg(e.target.value)} size="small" sx={{ width: 800 }} id="Image-Cover" label="Ссылка на мини-картинку" variant="filled" />
          <TextField value={img} onChange={e => setImg(e.target.value)} size="small"  multiline rows={10} sx={{ width: 800 }} id="Images" label="Ссылка на картинки" variant="filled" />
          <Autocomplete
              value={age}
              onChange={(event, newValue) => setAge(newValue.label)}
              disablePortal
              id="Rating"
              options={optionsRating}
              size="small"
              sx={{ width: 800 }}
              renderInput={(params) => <TextField {...params} label="Возрастной рейтинг" />}
          />
          <Autocomplete
              value={players}
              onChange={(event, newValue) => setPlayers(newValue.label)}
              freeSolo
              id="Count-Players"
              options={optionsPlayers}
              size="small"
              sx={{ width: 800 }}
              renderInput={(params) => <TextField {...params} label="Кол-во игроков" />}
          />
          <Autocomplete
              value={time}
              onChange={(event, newValue) => setTime(newValue.label)}
              disablePortal
              id="TimeOfPlay"
              size="small"
              options={optionsTime}
              sx={{ width: 800 }}
              renderInput={(params) => <TextField {...params} label="Время игры" />}
          />
          <div><Checkbox checked={popular} onChange={e => setPopular(!popular)}/><span>Популярное?</span></div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  {error}
              </Alert>
          </Snackbar>
          <Button onClick={AddGame} sx={{margin: 40}} variant="contained" color="success">Сохранить</Button>
      </Stack>
    </div>
  );
}

export default Change;
