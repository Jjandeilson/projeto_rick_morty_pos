import { Image } from 'primereact/image';

const Home = () => {
    return (
        <>
            <div className="card flex justify-content-center">
                    <Image src="/image/rick-morty.jpg" 
                        alt="rick and morty" width="250" />
                </div>
                <div className="card flex justify-content-center">
                    <p>
                        Trabalho realizar para fiz acadêmico, realizando construção de SPA com react e consulmo de API Rick and Morty.
                    </p>
                </div>
                <div className="card flex justify-content-center">
                    <p>
                        Foi criando páginas e componentes para reaproveitamento de código. Nesse projeto foi utilizado um biblioteca PrimeReact,
                        ela disponibiliza componentes já prontos para serem utilizadas na criação de páginas.
                    </p>   
                </div>
        </>
    )
}

export default Home