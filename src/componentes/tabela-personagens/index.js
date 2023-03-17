import { useNavigate } from 'react-router-dom';

import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';

const TabelaPersonagens = ({personagens}) => {
    const navegate = useNavigate();

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

    return(
        <>
            <DataView value={personagens}  itemTemplate={itemTemplate} />
        </>
    )
}

export default TabelaPersonagens