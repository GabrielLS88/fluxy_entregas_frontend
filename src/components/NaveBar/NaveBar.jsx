import Styles from './NaveBar.module.css';
import Logo from '../../assets/logo.png';

export default function NaveBar(){
    return (
        <nav className={Styles.navbar}>
            <div className={Styles.containerMarca}>
                <img 
                    className={Styles.logoMarca}
                    src={Logo}
                    alt="Fluxy"
                />
                <h2 className={Styles.escritaMarca}>Fluxy Serviços</h2>
            </div>
            <div className={Styles.containerLinks}>
                <a className={Styles.linksNaveBar} href="/">Entregas</a>
                <a className={Styles.linksNaveBar} href="/cadastrarentrega">Cadastrar</a>
                <a className={Styles.linksNaveBar} href="/atualizarentrega">Atualizar</a>
            </div>
        </nav>
    )
}