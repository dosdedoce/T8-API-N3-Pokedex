const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
        fire: "#FDDFDF",
        grass: "#DEFDE0",
        electric: "#FCF7DE",
        water: "#DEF3FD",
        ground: "#f4e7da",
        rock: "#d5d5d4",
        fairy: "#fceaff",
        poison: "#98d7a5",
        bug: "#f8d5a3",
        dragon: "#97b3e6",
        psychic: "#eaeda1",
        flying: "#F5F5F5",
        fighting: "#E6E0D4",
        normal: "#F5F5F5",
};
const objColors = Object.keys(colors);

const generateData=async()=>{
        const config = {
                headers: {
                        Accept: "application/json",
                },
        };
        for (let i = 1; i <= pokemon_count; i++) {
                let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
                await fetch(url, config)
                        .then((res) => res.json())
                        .then((data) => {
                                generateCar(data);
                        });
        }
}
generateData();

const generateCar=(data)=>{
        const divPokemon=document.createElement('div');
        divPokemon.setAttribute('class','pokemon');
        //const name = data.name[0].toUpperCase()+data.name.slice(1);
        //% PARA LAS IMGs
        const divImg=document.createElement('div');
        divImg.setAttribute('class','img-container');
        const img=document.createElement('img');
        const id=data.id;
        // console.log(insertZero(id));
        let idImg=insertZero(id);
        const name = convert(data.name);
        img.setAttribute('src',`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idImg}.png`);
        img.setAttribute('alt',name);
        //% FIN PARA LAS IMGs

        //! PARA LOS VALORES
        const divInfo=document.createElement('div');
        divInfo.setAttribute('class','info');
        const spanNumber= document.createElement('span');
        spanNumber.setAttribute('class','number');
        spanNumber.textContent=id;
        const h3Name=document.createElement('h3');
        h3Name.setAttribute('class','name');
        h3Name.textContent=name;
        const small=document.createElement('small');
        small.setAttribute('class','type');
        small.textContent='Type: ';
        const spanSmall=document.createElement(`span`);
        const pokemonTypes = data.types.map(type => type.type.name)
        const type = objColors.find(type => pokemonTypes.indexOf(type) > -1)
        divPokemon.style.backgroundColor=colors[type];
        spanSmall.textContent=type;
        //! FIN PARA LOS VALORES

        divImg.appendChild(img);

        small.appendChild(spanSmall);
        divInfo.appendChild(spanNumber);
        divInfo.appendChild(h3Name);
        divInfo.appendChild(small);

        divPokemon.appendChild(divImg);
        divPokemon.appendChild(divInfo)
        poke_container.appendChild(divPokemon);
}

const convert=(str)=>{
        return str.slice(0,1).toUpperCase()+str.slice(1);
}

const insertZero=(str)=>{
        let strZero=str.toString();
        let exit=true;
        do{
                if(strZero.length!==3){
                        strZero='0'+strZero;
                }else{
                        exit=false;
                }
        }while(exit);
        return strZero;
}