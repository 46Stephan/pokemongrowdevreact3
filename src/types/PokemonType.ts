export interface AbilityDetail {
    name: string;
}

export interface Ability {
    is_hidden: boolean;
    slot: number;
    ability: AbilityDetail;
}

export interface TypeDetail {
    name: string;
    url: string;
}

export interface TypePokemon {
    slot: number;
    type: TypeDetail;
}

export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female?: string;
    front_shiny_female?: string;
    back_default: string;
    back_shiny: string;
    back_female?: string;
    back_shiny_female?: string;
}

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    types: TypePokemon[];
    abilities: Ability[];
    sprites: PokemonSprites;
}
