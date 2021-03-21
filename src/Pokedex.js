import React from 'react';
import { AppBar, Card , CardContent , CardMedia , Grid,  Toolbar } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    pokedexContainer : {
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
    }
})

const getPokemonCard = () => {
    return (
        <Grid item xs={12} sm={4}>
            <Card>
                <CardMedia>

                </CardMedia>
                <CardContent>
                    Hi
                </CardContent>
            </Card>
        </Grid>
    )
}

const Pokedex = () => {
    const classes = useStyles()
    return (
        <>
            <AppBar position='static'>
                <Toolbar />
            </AppBar>
            <Grid container spacing={2} className={classes.pokedexContainer}>
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
            </Grid>
        </>
    )
}

export default Pokedex;