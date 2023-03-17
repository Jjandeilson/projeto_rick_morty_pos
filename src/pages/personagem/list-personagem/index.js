import { useEffect, useState } from 'react';

import { Paginator } from 'primereact/paginator';

import http from '../../../utils/http';
import TabelaPersonagens from '../../../componentes/tabela-personagens';


const ListaPersonagem = () => {
    document.title = 'Listagem de personagens';
    const getAllPersonagensURL = `/character/?page=`;
    const [listaPersonagens, setListaPersonagens] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [quantidadeDeLinhas, setQuantidadeDeLinhas] = useState(0);
    const [numeroPaginaValor, setNumeroPaginaValor] = useState(0);
    
    
    
    useEffect(() => {
        const getPersonagens = async () => {
            const response = await http.get(`${getAllPersonagensURL}/0`);
            setListaPersonagens(response?.data?.results);
            setTotalRegistros(response?.data?.info?.count);
            setQuantidadeDeLinhas(response?.data?.results.length);
        }

        getPersonagens();
    }, []);

    const proximaPagina = async (e) => {
        let numeroPagina = (e.page + 1);

        const response = await http.get(`${getAllPersonagensURL}${numeroPagina}`)
        setListaPersonagens(response?.data?.results)
        setTotalRegistros(response?.data?.info?.count)
        setNumeroPaginaValor(e.first)
    }

    return (
         <div className="card">
            <div className="grid">
                <TabelaPersonagens personagens={listaPersonagens}/>
                <div className="col-8 col-offset-2">
                    <Paginator first={numeroPaginaValor} rows={quantidadeDeLinhas} totalRecords={totalRegistros} onPageChange={proximaPagina} />
                </div>
            </div>
        </div>
    )
}

export default ListaPersonagem