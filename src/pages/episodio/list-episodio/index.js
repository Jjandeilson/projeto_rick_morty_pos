import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

import http from "../../../utils/http";

const ListEpisodio = () => {
    document.title = 'Listagem de episódios';
    const navegate = useNavigate();
    const getAllEpisodiosURL = `episode?page=`;
    const [listaEpisodios, setListaEpisodios] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [quantidadeDeLinhas, setQuantidadeDeLinhas] = useState(0);
    const [numeroPaginaValor, setNumeroPaginaValor] = useState(0);

    useEffect(() => {
        const getEpisodios = async () => {
            const response = await http.get(`${getAllEpisodiosURL}/0`);
            setListaEpisodios(response?.data?.results);
            setTotalRegistros(response?.data?.info?.count);
            setQuantidadeDeLinhas(response?.data?.results.length);
        }

        getEpisodios()
    }, [])

    const proximaPagina = async (e) => {
        let numeroPagina = (e.page + 1);

        const response = await http.get(`${getAllEpisodiosURL}${numeroPagina}`);
        setListaEpisodios(response?.data?.results);
        setTotalRegistros(response?.data?.info?.count);
        setNumeroPaginaValor(e.first);
    }    
    
    const gerarLink = (ids) => (id) => {
        return <Button link label="Detalhe" onClick={() => directEpisodio(id.id)} />
    }

    const directEpisodio = (id) => {
        navegate(`${id}`)
    }

    return (
        <>
            <div className="grid">
                <div className="col-6 col-offset-3">
                    <DataTable value={listaEpisodios} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Nome do Episódio"></Column>
                        <Column field="air_date" header="Data de estreia"></Column>
                        <Column header="Ação" body={gerarLink(listaEpisodios)}></Column>
                    </DataTable>
                    <Paginator first={numeroPaginaValor} rows={quantidadeDeLinhas} totalRecords={totalRegistros} onPageChange={proximaPagina} />
                </div>
            </div>
        </>
    )
}

export default ListEpisodio