import React, { useEffect, useState } from 'react';
import {toFirstCharUppercase} from './constants'
import { AppBar, Card , CardContent , CardMedia, CircularProgress, Grid,  TextField,  Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import {fade ,makeStyles} from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    pokedexContainer : {
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
    },
    cardMedia : {
        margin: 'auto',
    },
    searchContainer: {
        display : 'flex',
        backgroundColor: fade(theme.palette.common.white , 0.15),
        paddingLeft: 20,
        paddingright: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    searchIcon : {
        alignSelf: 'flex-end',
        marginBottom: 5,
    }
}));

const getPokemonCard = ({pokemonId, pokemonData , classes , history}) => {
    const {id , name , sprite} = pokemonData[pokemonId];
    return (
        <Grid item xs={12} sm={4} key={pokemonId}>
            <Card onClick= {() => history.push(`./${id}`)}>
                <CardMedia
                    className={classes.cardMedia}
                    image={sprite}
                    style = {{width : 130 , height: 130}}    
                 />
                <CardContent>
                    <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

const Pokedex = props => {
    console.log(props);
    const { history } = props;
    const classes = useStyles();
    const [pokemonData , setPokemonData] = useState();
    const [filter , setFilter] = useState('');

    const handleSearchChange = event => {
        setFilter(event.target.value);
    }

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50`)
        .then(response => {
            console.log('response' , response)
            const { data } = response;
            const { results } = data;
            const newPokemonData = {};
            results.forEach( (pokemon , index) => {
                newPokemonData[index+1] = {
                    id : index + 1 ,
                    name : pokemon.name,
                    sprite : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
                }
            })
            setPokemonData(newPokemonData);
        })
    } , [])
    return (
        <>
        <AppBar position='static'>
            <Toolbar>
                <div className={classes.searchContainer}>
                    <SearchIcon className={classes.searchIcon} />
                    <TextField
                        onChange={handleSearchChange} 
                        className={classes.searchTextField} 
                        label='Pokemon' 
                        variant='standard' 
                    />
                </div>
            </Toolbar>
        </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(pokemonId =>
                        pokemonData[pokemonId].name.includes(filter) &&
                        getPokemonCard({pokemonId , pokemonData ,classes , history}))
                    }
                </Grid>
            ) : (
                <CircularProgress />
            )}
            
        </>
    )
}

export default Pokedex;