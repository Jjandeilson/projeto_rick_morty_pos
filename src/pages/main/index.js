import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../shared/barra-navegacao"


const Main = () => (
    <>
        <BarraNavegacao />
        <main>
            <Outlet />
        </main>
    </>

) 

export default Main