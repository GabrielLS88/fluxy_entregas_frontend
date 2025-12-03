import Style from './Entregas.module.css';
import NaveBar from '../../components/NaveBar/NaveBar.jsx';
import { useDelivery } from "../../components/AppContext/AppContex.jsx";
import { useEffect } from 'react';

export default function Entregas() {
    const { deliveries } = useDelivery();

    useEffect(() => {
        console.log(deliveries)
    }, [deliveries])

    return (
        <section className={Style.sectionPageEntregas}>

            <NaveBar />

            <div className={Style.containerPageEntregas}>
                {deliveries.length > 0 && (
                    deliveries.map((dev) => {
                        return (
                            <div key={dev.code_product} className={Style.modalEntregas}>
                                <h1><b>{dev.product}</b></h1>
                                <p>
                                    <b>Valor:</b> {dev.price_product}
                                </p>
                                <p>
                                    <b>Data de entrega:</b> {dev.deliveryDate}
                                </p>
                                <p>
                                    <b>Status de intrega:</b> {dev.status}
                                </p>
                                <p>
                                    <b>ID de rastreio:</b> {dev.code_tracking}
                                </p>
                                <p>
                                    <b>Data de criação:</b> {dev.createdAt}
                                </p>
                                <p>
                                    <b>Número da casa:</b> {dev.house_number}
                                </p>
                                <p>
                                    <b>CEP:</b> {dev.zip_code}
                                </p>
                                <p>
                                    <b>ID da entrega:</b> {dev._id}
                                </p>
                            </div>
                        )
                    })
                )}

                {deliveries.length == 0 && (
                    <div>
                        Não foi encontrado nenhume entrega no momento!
                    </div>
                )}
            </div>
        </section>
    )
}