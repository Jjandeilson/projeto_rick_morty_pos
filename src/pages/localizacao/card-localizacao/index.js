import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

import http from '../../../utils/http';
import TabelaPersonagens from '../../../componentes/tabela-personagens';

const CardLocalizacao = () => {
    const {id} = useParams();
    const getLocalizacaoURL = "/location";
    const getAllPersonagensURL = "/character";
    const [localizacao, setLocalizacao] = useState({});
    const [listaPersonagens, setListaPersonagem] = useState([]);

    useEffect(() => {
        const getLocation = async () => {
            await http.get(`${getLocalizacaoURL}/${id}`)
                .then(response => {
                    setLocalizacao(response.data);
                    alterarNomePagina(response.data.name)
                    carregaPersonagens(response.data.residents)
                        .then(resp => setListaPersonagem(resp.data))
                }
            )
        }

        getLocation();
    }, [])

    const alterarNomePagina = (nomeLocalizacao) => {
        document.title = `Localização: ${nomeLocalizacao}`;
    }

    const carregaPersonagens = async (nomePersonagens) => {
        let listaPersonagens = nomePersonagens.reduce((acc, valor) => {
          return acc += valor.substr(valor.lastIndexOf('/')).replace('/', ',')
        }, '')
       return await http.get(`${getAllPersonagensURL}/${listaPersonagens}`)
    } 

    return (
        <>
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                    <div className="col-offset-3">
                            <Card title="Detalhe do Episódio" style={{width: '950px'}}>
                                <div>
                                    <p>
                                        <Badge value={`Nome da localização: ${localizacao.name}`} size="large" severity="success"></Badge>
                                    </p>
                                    <p>
                                        <Badge value={`Tipo da localização: ${localizacao.type}`} size="large" severity="success"></Badge>
                                    </p>
                                    <p>
                                        <Badge value={`Dimensão da Localização: ${localizacao.dimension}`} size="large" severity="success"></Badge>
                                    </p>
                                </div>
                                <div lassName="col-12">
                                    <TabelaPersonagens personagens={listaPersonagens} />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardLocalizacao