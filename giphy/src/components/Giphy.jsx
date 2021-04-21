import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loader from "./Loader";
import Pagina from "./Pagina";
const Giphy = () =>{

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const [paginaPrincipal, setPaginaPrincipal] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);
    const indexDoUltimoItem = paginaPrincipal * itensPorPagina;
    const indexDoPrimeiroItem = indexDoUltimoItem - itensPorPagina;
    const itensAtuais = data.slice(indexDoPrimeiroItem, indexDoUltimoItem);

    useEffect(() =>{
        const fechData = async()=>{
            setIsLoading(true)

            
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key:"LDgZGJ7SdL4OD1Nqx1XafcWhnMkFFRGr" ,
                        limits: 100

                       
                    }
                });

                console.log(results);
                setData(results.data.data);
            
            

            
            setIsLoading(false);    
        };

        fechData();
    },[]);

    const renderGifs = () => {
        if(isLoading){
            return (
                <Loader/>
            )
        }
        return itensAtuais.map(el => {
            return(
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url}/>
                </div>
            )
        });
    };


    const handleSearchChange = event => {
      
        setSearch(event.target.value);
    };

    const handleSubmit = async event =>{
            event.preventDefault();
        const results = await axios("https://api.giphy.com/v1/gifs/search",{
            params: {
                api_key:"LDgZGJ7SdL4OD1Nqx1XafcWhnMkFFRGr",
                q: search,
                limits: 100
            }
        });

        setData(results.data.data);
    };
    
    const paginaAtual = (carregarMais) =>{
        setPaginaPrincipal(carregarMais);
    }

    return(
        <div>
                
            <form className="form-inline justify-content-center m-4">
                <input value={search} onChange={handleSearchChange} type="text" placeholder="pesquisar" className="form-control"/>
                <button onClick={handleSubmit} type="submit" className="btn btn-warning mx-2">Bora Lá</button>
               
            </form>
            
            <fom className="form-inline justify-content-center m-4">

                 <Pagina paginaAtual={paginaAtual} paginaPrincipal={paginaPrincipal} itensPorPagina={itensPorPagina} totalItens={data.length}/>
            </fom>
            
            
            <div className="container gifs">{renderGifs()}</div>

            
        </div>
            
        
    );
}

export default Giphy