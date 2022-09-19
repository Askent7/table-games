import '../css/App.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {Autocomplete, Tab, TableBody, TableCell, TableHead,TableRow,} from '@mui/material';
import {Checkbox} from "@mui/material";
import {TextField} from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import {Alert} from "@mui/material";
import {Stack} from "@mui/material";
import { styled } from '@mui/material/styles';
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {deleteGame, fetchCategory, fetchAllGame} from "../http/gameAPI";
import * as React from "react";
import {Table} from "@mui/material";
import {get, values, keys, has} from "mobx"
import { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import {Link} from 'react-router-dom'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useNavigate} from "react-router-dom";
import {ADD_ROUTE, TABLE_ROUTE} from "../utils/const";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TableShow = observer(() => {
    const {game} = useContext(Context)

    function Cat(id) {
        let cat = (get(game.categories, (id - 1))).name_category;
        return cat
    }

    useEffect(() => {
        fetchCategory().then(data => game.setCategories(data))
        setTimeout(() => {
        }, 700)
        fetchAllGame().then(data => game.setGames(data.rows))

    }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - game.games.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    function deleteGa(id){
        deleteGame(id);

        setTimeout(()=>{ fetchAllGame().then(data => game.setGames(data.rows))}, 100)


    }
    setTimeout(() => {
    }, 1500)
    const history = useNavigate();
    return (
        <div className="Padding">
            <Table sx={{minWidth: 650}} size="small">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell allign = "right">Название игры</StyledTableCell>
                        <StyledTableCell allign = "right">Категория</StyledTableCell>
                        <StyledTableCell allign = "right">Цена</StyledTableCell>
                        <StyledTableCell allign = "right"></StyledTableCell>
                    </StyledTableRow>

                </TableHead>
                <TableBody>
                    {game.games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(game => (<StyledTableRow key={game.id_product} sx={{'&:last-child td, &:last-child th':{border:0}}}>
                        <StyledTableCell component="th" scope="row">{game.game_name}</StyledTableCell>
                        <StyledTableCell align="left" > {Cat(game.categoryIdCategories)} </StyledTableCell>
                        <StyledTableCell sx={{width: 25}} align="left">{game.price}</StyledTableCell>
                        <StyledTableCell sx={{width: 25}}><div className="But">
                            <ButtonGroup size="medium" variant="text" aria-label="text button group">
                                <IconButton size="medium" onClick={() => history(ADD_ROUTE + '/' + game.id_product)}><EditOutlinedIcon/></IconButton>
                                <IconButton size="medium" onClick={() => deleteGa(game.id_product)}><DeleteOutlineOutlinedIcon /></IconButton>
                            </ButtonGroup></div>
                        </StyledTableCell>
                    </StyledTableRow>))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <StyledTableCell allign = "right"></StyledTableCell>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: game.games.length }]}
                            colSpan={3}
                            count={game.games.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'Записей на страницу',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />

                    </TableRow>
                </TableFooter>
            </Table>

            <div className="But1"><Link to={ADD_ROUTE} className="Link"><Button color="success"  variant="contained" >Добавить</Button></Link></div>

        </div>
    );

})


export default TableShow;
