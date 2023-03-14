import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

import http from '../../../utils/http'

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const CardPersonagem = () => {
    const [personagem, setPersonagem] = useState({});
    const [listaEpisodio, setListaEpisodio] = useState([])
    const navegate = useNavigate();
    const {id} = useParams();
    const getPersonagemURL = "/character";
    
    useEffect(() => {
        const getPersonagem = async () => {
            await http.get(`${getPersonagemURL}/${id}`)
            .then(response => {
                setPersonagem(response.data)
                carregaEpisodios(response.data.episode)
                    .then(resp => {
                        setListaEpisodio(resp.data)
                })
            })
        }
            
        getPersonagem();
    }, [])    

    const carregaEpisodios = async (nomeEpisodios) => {
        let listaEp = nomeEpisodios.reduce((acc, valor) => {
          return acc += valor.substr(valor.lastIndexOf('/')).replace('/', ',')
        }, '')
       return await http.get(`/episode/${listaEp}`)
    } 
    
    const directEpisodio = (e) => {
        navegate(e)
    }

    const carregarCampo = (episodios) => (r) => {
        return <Button link onClick={() => directEpisodio(`/episodios/${r.id}`)} label={r.name} />
    }

    return (
        <div className="card">
            <div className="grid">
                <div className="col-12">
                        <div className="col-offset-4">
                            <Card header={<img src={personagem?.image} />} style={{width: '350px'}}>
                                <ul>
                                    <li>Nome: {personagem?.name}</li>
                                    <li>Status: {personagem?.status}</li>
                                    <li>Espécie: {personagem?.species}</li>
                                    <li>Origem: {personagem?.origin?.name}</li>
                                    <li>Localização: {personagem?.location?.name}</li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </div>
            <div className="col-6 col-offset-3">
                <DataTable value={listaEpisodio}>
                    <Column header="Episódio" body={carregarCampo(listaEpisodio)}></Column>
                </DataTable>                
            </div>
        </div>
    )
}

export default CardPersonagem