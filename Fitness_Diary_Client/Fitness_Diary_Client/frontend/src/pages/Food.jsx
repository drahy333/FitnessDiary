import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import AddFoodForm from './food/AddFoodForm';
import { useStateContext } from '../context/ContextProvider';
import { Button } from '../components';
import fetchFoods from '../utils/fetchFoods';
import React, { useState, useEffect } from 'react';
import DatePickerControl from '../components/DatePickerControl';
import dayjs from 'dayjs';

import DataDisplay from '../components/DataDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faSeedling, faFish, faOilCan, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import FoodChartDisplay from '../components/Charts/FoodChartDisplay';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { SearchBar } from '../components/SearchBar';
import { SearchResultsList } from '../components/SearchResultsList';
import AddUserNutritionForm from './food/AddUserNutritionForm';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Food',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'fats',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)',
    },
    {
        id: 'carbohydrates',
        numeric: true,
        disablePadding: false,
        label: 'Carbohydrates (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    },
    { id: 'delete',
    numeric: true,
    disablePadding: false,
    label: ''}
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [showFoodForm, setShowFoodForm] = useState(false);
    const [showUserNutritionForm, setShowUserNutritionForm] = useState(false);

    const { currentColor, foods, setFoods} = useStateContext();

    const [selectedDate, setSelectedDate] = useState(dayjs());

    const [foodTotals, setFoodTotals] = useState({ totalCalories: 0, totalCarbs: 0, totalProtein: 0, totalFats: 0 });

    const [results, setResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleShowFoodForm = () => setShowFoodForm(true);
    const handleCloseFoodForm = () => setShowFoodForm(false);

    const handleShowUserNutritionForm = () => setShowUserNutritionForm(true);
    const handleCloseUserNutritionForm = () => setShowUserNutritionForm(false);


    const deleteFood = async (foodId) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteFood/${foodId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                setFoods(prevFoods => prevFoods.filter(food => food.id !== foodId));
            } else {
                throw new Error('Failed to delete the food.');
            }
        } catch (error) {
            console.log(foodId);
            console.error('Error deleting food:', error);
            alert('Failed to delete food.');
        }
      };

      const handleAddUserNutrition = (newFood) => {
        setFoods([...foods, newFood]);
    };
    
    

    useEffect(() => {
        fetchFoods(sessionStorage.getItem('token'), selectedDate, setFoods);
    }, [selectedDate]);

    useEffect(() => {
        const totals = calculateTotals();
        setFoodTotals(totals);
    }, [foods]);

    const calculateTotals = () => {
        let totalCalories = 0;
        let totalCarbs = 0;
        let totalProtein = 0;
        let totalFats = 0;

        foods.forEach(food => {
            totalCalories += parseInt(food.calories);
            totalCarbs += parseInt(food.carbohydrates);
            totalProtein += parseInt(food.protein);
            totalFats += parseInt(food.fats);
        });

        return { totalCalories, totalCarbs, totalProtein, totalFats };
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const visibleRows = React.useMemo(() => stableSort(foods, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [foods, order, orderBy, page, rowsPerPage]
    );

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - foods.length) : 0;

    const foodStats = [
        { icon: <FontAwesomeIcon icon={faUtensils} />, name: 'Total Calories', amount: `${foodTotals.totalCalories} kcal` },
        { icon: <FontAwesomeIcon icon={faSeedling} />, name: 'Total Carbs', amount: `${foodTotals.totalCarbs} g` },
        { icon: <FontAwesomeIcon icon={faDrumstickBite} />, name: 'Total Protein', amount: `${foodTotals.totalProtein} g` },
        { icon: <FontAwesomeIcon icon={faOilCan} />, name: 'Total Fats', amount: `${foodTotals.totalFats} g` },
    ];

    const StyledButton = styled(MuiButton)({
        background: currentColor,
        border: 0,
        borderRadius: '20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        '&:hover': {
            backgroundColor: 'rgba(255, 115, 135, .8)',
            boxShadow: '0 5px 7px 2px rgba(255, 105, 135, .4)'
        },
        transition: 'background-color 0.3s, box-shadow 0.3s',
    });

    return (
        <div style={{}}>
            <div>
                <DatePickerControl selectedDate={selectedDate} setSelectedDate={setSelectedDate} label={'Select date'} />
            </div>
            <DataDisplay data={foodStats} bgColor={'#4fb3bf'}/>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <StyledButton onClick={handleShowFoodForm}>
                    ADD NEW ITEM 🍎
                </StyledButton>
            </div>
            <SearchBar setResults={setResults}/>
            <SearchResultsList results={results} show = {handleShowUserNutritionForm} setSelectedItem={setSelectedItem}/>
            <AddUserNutritionForm show={showUserNutritionForm} handleClose= {handleCloseUserNutritionForm} selectedItem={selectedItem} selectedDate={selectedDate} handleAddFood={handleAddUserNutrition}/>
            <AddFoodForm show={showFoodForm} handleClose={handleCloseFoodForm} selectedDate={selectedDate} />
            <div style={{overflowX: 'hidden'}}>
            <Box sx={{ width: '100%' }}>
                <div >
                <Paper sx={{ width: '100%', mb: 2, borderRadius: '16px', marginX: '10px'}}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={foods.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                                    hover
                                                    // onClick={(event) => handleClick(event, row.id)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                            <TableCell component="th" id={labelId} scope="row" padding="15px" sx={{ marginLeft: '16px'} }>
                                                {row.foodItem}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="right">{row.fats}</TableCell>
                                            <TableCell align="right">{row.carbohydrates}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => {deleteFood(row.id)
                                                }}><CloseIcon style={{ color: 'black' }}/></IconButton>
                                                </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={foods.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                </div>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                    sx={{marginX:'10px'}}
                />
            </Box>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <FoodChartDisplay foods={foods} />
            </Box>
        </div>
    );
}
