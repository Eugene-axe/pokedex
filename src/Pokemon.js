import { Button, CircularProgress, Link, Typography } from '@material-ui/core';
import React , {useEffect, useState} from 'react';
import {toFirstCharUppercase} from './constants'
import axios from 'axios'



const Pokemon = props => {
    const {match , history} = props;
    const {params} = match;
    const {pokemonId} = params;
    const [pokemon , setPokemon] = useState(undefined)

    useEffect( ()=> {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {
            const {data} = response;
            setPokemon(data);
        })
        .catch( error => setPokemon(false))
    }, [pokemonId])

    const generatePokemonJSX = () => {
        const { name , id , species , height , weight , types , sprites} = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
        const {front_default} = sprites;
        return (
            <>
                <Typography variant='h1'>
                    {`${id}.`} {toFirstCharUppercase(name)}
                    <img src={front_default}/>
                </Typography>
                <img src={fullImageUrl} alt={name} style={{width: 300 , height: 300}}/>
                <Typography variant='h3'>Pokemon INFO</Typography>
                <Typography>
                    Species: 
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Height : {height}</Typography>
                <Typography>Weight : {weight}</Typography>
                <Typography variant='h6'>Types : </Typography>
                {types.map((typeInfo) => {
                    const {type} = typeInfo;
                    const {name} = type;
                    return <Typography key={name}>{name}</Typography>
                })}
            </>
        )
    }

    return (
        <>
            {pokemon === undefined && <CircularProgress /> }
            {pokemon !== undefined && pokemon && generatePokemonJSX() }
            {pokemon === false && <Typography>Pokemon not found</Typography> }
            <Button variant='contained' onClick={()=> history.push('/')}>back to pokedex</Button>
        </>
    )
}

export default Pokemon;