import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

import http from '../../../utils/http';
import TabelaPersonagens from '../../../componentes/tabela-personagens';

const CardEpisodio = () => {
    const getEpisodioURL = "/episode";
    const getAllPersonagensURL = "/character"
    const [episodio, setEpisodio] = useState({});
    const [listaPersonagens, setListaPersonagem] = useState([]);
    const {idEpisodio} = useParams();

    useEffect(() => {
        const getEpisodio = async () => {
            await http.get(`${getEpisodioURL}/${idEpisodio}`)
                .then(response => {
                    setEpisodio(response.data);
                    alterarNomePagina(response.data.name)
                    carregaPersonagens(response.data.characters)
                        .then(resp => setListaPersonagem(resp.data))
                }
            )
        }

        getEpisodio()
    }, [])

    const alterarNomePagina = (nomeEpisodio) => {
        document.title = `Episódio: ${nomeEpisodio}`;
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
                                        <Badge value={`Nome do Episódio: ${episodio.name}`} size="large" severity="success"></Badge>
                                    </p>
                                    <p>
                                        <Badge value={`Date de estreia: ${episodio.air_date}`} size="large" severity="success"></Badge>
                                    </p>
                                </div>
                                <div className="col-12">
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

export default CardEpisodio