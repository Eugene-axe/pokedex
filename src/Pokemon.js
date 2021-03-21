import React from 'react';

const Pokemon = props => {
    const {match} = props;
    const {params} = match;
    const {pokemonId} = params;
    console.log(props);
    console.log(params);
    console.log(pokemonId);
    return (
        <div>{`This is Pokemon page for pokemon #${pokemonId}`}</div>
    )
}

export default Pokemon;