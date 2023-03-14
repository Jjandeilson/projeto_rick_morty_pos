import { Outlet } from "react-router-dom"
import BarraNavegacao from "../../shared/barra-navegacao"


const Main = () => (
    <>
        <BarraNavegacao />
        <main>
            <link rel="stylesheet" href="https://unpkg.com/primeflex@^3/primeflex.css"></link>
            <Outlet />
        </main>
    </>

) 

export default Main