import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

import http from '../../../utils/http'

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const CardPersonagem = () => {
    const navegate = useNavigate();
    const getPersonagemURL = "/character";
    const getAllEpisodiosURL = "/episode";
    const {id} = useParams();
    const [personagem, setPersonagem] = useState({});
    const [listaEpisodios, setListaEpisodios] = useState([])
    
    useEffect(() => {
        const getPersonagem = async () => {
            await http.get(`${getPersonagemURL}/${id}`)
            .then(response => {
                setPersonagem(response.data)
                alterarNomePagina(response.data.name)
                carregaEpisodios(response.data.episode)
                .then(resp => {
                    setListaEpisodios(resp.data)
                })
            })
        }
        
        getPersonagem();
    }, []) 
    
    const alterarNomePagina = (nomePersonagem) => {
        document.title = `Personagem: ${nomePersonagem}`;
    }

    const carregaEpisodios = async (nomeEpisodios) => {
        let listaEpisodioss = nomeEpisodios.reduce((acc, valor) => {
          return acc += valor.substr(valor.lastIndexOf('/')).replace('/', ',')
        }, '')
       return await http.get(`${getAllEpisodiosURL}/${listaEpisodioss}`)
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
                <DataTable value={listaEpisodios}>
                    <Column header="Episódio" body={carregarCampo(listaEpisodios)}></Column>
                </DataTable>                
            </div>
        </div>
    )
}

export default CardPersonagem