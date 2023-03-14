import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';

import http from "../../../utils/http";

const ListLocalizacao = () => {
    const [localizacaoList, setLocalizacaoList] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [quantidadeDeLinhas, setQuantidadeDeLinhas] = useState(0);
    const [numeroPaginaValor, setNumeroPaginaValor] = useState(0);
    const navegate = useNavigate();

    const getAllLocalizacoes = `location?page=`;

    useEffect(() => {
        const getLocalizacoes = async () => {
            const response = await http.get(`${getAllLocalizacoes}/0`);
            setLocalizacaoList(response?.data?.results);
            setTotalRegistros(response?.data?.info?.count);
            setQuantidadeDeLinhas(response?.data?.results.length);
        }

        getLocalizacoes()
    }, [])

    const proximaPagina = async (e) => {
        let numeroPagina = (e.page + 1);

        const response = await http.get(`${getAllLocalizacoes}${numeroPagina}`);
        setLocalizacaoList(response?.data?.results);
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
                    <DataTable value={localizacaoList} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Nome da localização"></Column>
                        <Column field="type" header="Tipo da localização"></Column>
                        <Column field="dimension" header="Dimensão da Localização"></Column>
                        <Column header="Ação" body={gerarLink(localizacaoList)}></Column>
                    </DataTable>
                    <Paginator first={numeroPaginaValor} rows={quantidadeDeLinhas} totalRecords={totalRegistros} onPageChange={proximaPagina} />
                </div>
            </div>
        </>
    )
}

export default ListLocalizacao