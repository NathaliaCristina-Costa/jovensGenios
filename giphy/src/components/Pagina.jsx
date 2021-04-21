import React from 'react'

const Pagina = (props) => {
    const carregarMais = []

    for (let i = 1; i < Math.ceil(props.totalItens/props.itensPorPagina); i++) {
        carregarMais.push(i);
        
    }
    return(
        <nav>
            <ul className="pagination pagination-sm justify-content-end border-0">
                {carregarMais.map(number => {
                  
                    return (
                        <li className="page-item">
                            <a  onClick={()=>props.paginaAtual(number)} href="!#" className="page-link">
                                {number}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}

export default Pagina;