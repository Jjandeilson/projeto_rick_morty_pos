import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TabMenu } from 'primereact/tabmenu';

const listaMenu = [
    {label: 'Home', icon: 'pi pi-home', link: '/'},
    {label: 'Personagens', icon: 'pi pi-user', link: '/personagens'},
    {label: 'Episódios', icon: 'pi pi-list', link: '/episodios'},
    {label: 'Localização', icon: 'pi pi-fw pi-home', link: '/localizacoes'}
];

const BarraNavegacao = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navegacao = useNavigate();

    const nomePagina = (event) => {
        if (event?.value.link === '/') {
            document.title = 'Home'
        }
    }
    
    const atualizarIndex = (event) => {
        setActiveIndex(event.index);
        nomePagina(event);        
        navegacao(event?.value.link)
    }

    return (
        <>
            <div class="grid">
                <div class="col-6 col-offset-3">
                    <TabMenu model={listaMenu} activeIndex={activeIndex} onTabChange={(e) => atualizarIndex(e) } />
                </div>
            </div>
        </>
    )
}

export default BarraNavegacao