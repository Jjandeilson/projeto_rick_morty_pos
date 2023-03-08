import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { DataView } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';

import http from '../../../utils/http';

const ListaPersonagem = () => {
    const [personagensList, setPersonagensList] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [quantidadeDeLinhas, setQuantidadeDeLinhas] = useState(0);
    const [numeroPaginaValor, setNumeroPaginaValor] = useState(0);

    const getAllPersonagens = `/character/?page=`;
    
    const proximaPagina = async (e) => {
        let numeroPagina = (e.page + 1);

        const response = await http.get(`${getAllPersonagens}${numeroPagina}`)
        setPersonagensList(response?.data?.results)
        setTotalRegistros(response?.data?.info?.count)
        setNumeroPaginaValor(e.first)
     
    }

    const exibirInfomacaoPersonagem = async (event, id) => {
        event.preventDefault();
    }

    useEffect(() => {
        const getPersonagens = async () => {
            const response = await http.get(`${getAllPersonagens}/0`)
            setPersonagensList(response?.data?.results)
            setTotalRegistros(response?.data?.info?.count)
            setQuantidadeDeLinhas(response?.data?.results.length)
        }

        getPersonagens();
    }, []);

    const itemTemplate = (personagem) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" 
                        src={personagem.image} onClick={(event, id) => exibirInfomacaoPersonagem(event, personagem.id)}/>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="flex align-items-center gap-3">
                                <ul>
                                    <li>{personagem.name}</li>
                                    <li>{personagem.status}</li>
                                    <li>{personagem.species}</li>
                                    <li>{personagem.origin.name}</li>
                                    <li>{personagem.location.name}</li>
                                </ul>
                            </div>
                            <Link to={`${personagem.id}`}>Link</Link> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    
    return (
         <div className="card">
            <DataView value={personagensList}  itemTemplate={itemTemplate} />
            <Paginator first={numeroPaginaValor} rows={quantidadeDeLinhas} totalRecords={totalRegistros} onPageChange={proximaPagina} />
        </div>
    )
}

export default ListaPersonagem