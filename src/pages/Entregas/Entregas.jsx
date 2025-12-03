import Style from './Entregas.module.css';
import NaveBar from '../../components/NaveBar/NaveBar.jsx';
import { useDelivery } from "../../components/AppContext/AppContex.jsx";
import { useEffect } from 'react';

export default function Entregas() {
    const { deliveries } = useDelivery();

    function converterParaBrasileiro(dataISO) {
        const data = new Date(dataISO);

        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();

        const horas = String(data.getUTCHours()).padStart(2, '0');
        const minutos = String(data.getUTCMinutes()).padStart(2, '0');
        const segundos = String(data.getUTCSeconds()).padStart(2, '0');

        return `${dia}/${mes}/${ano}`;
    }

    function formatarReal(valor) {
        return Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }


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
                                    <b>ID da entrega:</b> {dev._id}
                                </p>
                                <p>
                                    <b>Valor do produto + Taxa:</b> {formatarReal(dev.price_product)}
                                </p>

                                <p>
                                    <b>Data de entrega:</b> {converterParaBrasileiro(dev.deliveryDate)}
                                </p>
                                <p>
                                    <b>Status de intrega:</b> {dev.status}
                                </p>
                                <p>
                                    <b>Codigo de rastreio para cliente:</b> {dev.code_tracking}
                                </p>
                                <p>
                                    <b>Data de criação:</b> {converterParaBrasileiro(dev.createdAt)}
                                </p>
                                <p>
                                    <b>Número da casa:</b> {dev.house_number}
                                </p>
                                <p>
                                    <b>CEP:</b> {dev.zip_code}
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