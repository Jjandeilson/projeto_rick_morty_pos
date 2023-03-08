import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import http from '../../../utils/http'

import { Card } from 'primereact/card';


const CardPersonagem = () => {
    const header = (url) => <img src='${url}' />;
    const [personagem, setPersonagem] = useState({});
    const {id} = useParams();
    const getPersonagemURL = "/character";

    useEffect(() => {
        const getPersonagem = async () => {
            const response = await http.get(`${getPersonagemURL}/${id}`);
            setPersonagem(response.data)
            console.log(response.data)
        }

        getPersonagem();
    }, [])

    return (
        <div className="card flex justify-content-center">
            <Card title={personagem?.name} header={<img src={personagem?.image} />} style={{width: '350px'}}>
                <ul>
                    <li>Status: {personagem?.status}</li>
                    <li>Espécie: {personagem?.species}</li>
                    <li>Origem: {personagem?.origin?.name}</li>
                    <li>Localização: {personagem?.location?.name}</li>
                </ul>
            </Card>
        </div>
    )
}

export default CardPersonagem