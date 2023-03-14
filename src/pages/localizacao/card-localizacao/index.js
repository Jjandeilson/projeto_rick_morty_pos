import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';

import http from '../../../utils/http';

const CardLocalizacao = () => {
    const [localizacao, setLocalizacao] = useState({});
    const [listaPersonagens, setListaPersonagem] = useState([]);
    const navegate = useNavigate();
    const {id} = useParams();
    const getLocalizacao = "/location";

    useEffect(() => {
        const getLocation = async () => {
            await http.get(`${getLocalizacao}/${id}`)
                .then(response => {
                    setLocalizacao(response.data);
                    carregaPersonagens(response.data.residents)
                        .then(resp => setListaPersonagem(resp.data))
                }
            )
        }

        getLocation();
    }, [])

    const carregaPersonagens = async (nomePersonagens) => {
        let listaPersonagens = nomePersonagens.reduce((acc, valor) => {
          return acc += valor.substr(valor.lastIndexOf('/')).replace('/', ',')
        }, '')
       return await http.get(`/character/${listaPersonagens}`)
    } 

    const directPersonagem = (e) => {
        navegate(e)
    }

    const itemTemplate = (personagem) => {
        return (
            <div className="col-8 col-offset-2">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" 
                        src={personagem.image} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="flex align-items-center gap-3">
                                <ul>
                                    <li>Nome: {personagem.name}</li>
                                    <li>Status: {personagem.status}</li>
                                    <li>Espécie: {personagem.species}</li>
                                    <li>Localização: {personagem.location.name}</li>
                                </ul>
                            </div>
                            <Button link onClick={() => directPersonagem(`/personagens/${personagem.id}`)}>Informações do personagem</Button> 
                        </div>
                    </div>
                </div>
            </div>
        );
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
                                    <DataView value={listaPersonagens}  itemTemplate={itemTemplate} />
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