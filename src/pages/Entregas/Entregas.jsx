import Style from './Entregas.module.css';
import NaveBar from '../../components/NaveBar/NaveBar.jsx';

export default function Entregas() {
    return (
        <section className={Style.sectionPageEntregas}>

            <NaveBar />

            <div className={Style.containerPageEntregas}>
                <h1>Entregas Page</h1>
            </div>
        </section>
    )
}