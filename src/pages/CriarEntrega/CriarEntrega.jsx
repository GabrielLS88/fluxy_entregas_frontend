import Style from './CriarEntrega.module.css';
import NaveBar from '../../components/NaveBar/NaveBar.jsx';
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export default function CriarEntrega() {

    const [formData, setFormData] = useState({
        product: '',
        code_product: '',
        price_product: '',
        zip_code: '',
        house_number: '',
        code_tracking: '',
        status: ''
    });

    const [dadosEstaoCompletos, setDadosEstaoCompletos] = useState(true);

    useEffect(() => {
        if (formData.product && formData.code_product && formData.price_product && formData.zip_code && formData.house_number && formData.code_tracking && formData.status) {
            return setDadosEstaoCompletos(false)
        }
        console.log("formData incompleto")
    }, [formData])

    const executarSubmit = () => {
        if (formData.code_product != [0-9] && formData.price_product != [0-9]  && formData.zip_code != [0-9]  && formData.house_number != [0-9]) {
            toast.error("Necessario que seja numeros nos campos: Codigo produto, Valor produto, CEP e N° do imovel")
        }
        toast.success("Entrega criada com sucesso!")
        console.log('Form submitted:', formData);
    }

    return (
        <section className={Style.sectionPageCriarEntregas}>

            <NaveBar />

            <div className={Style.containerPageCriarEntregas}>
                <div className={Style.spaceParaTituloModal}>
                    <h2 className={Style.tituloSpaceModal}>Dados para criar entrega</h2>
                </div>
                <div className={Style.spaceInputsCriarEntrega}>
                    <div className={Style.inputsCriarEntrega}>
                        <label>Nome produto</label>
                        <input className={Style.inputEntrega} name='product' value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })} type="text" />
                    </div>
                    <div className={Style.inputsCriarEntrega}>
                        <label htmlFor="code_product">Codigo produto</label>
                        <input className={Style.inputEntrega} name='code_product' value={formData.code_product} onChange={(e) => setFormData({ ...formData, code_product: e.target.value })} type="text" />
                    </div>
                    <div className={Style.inputsCriarEntrega}>
                        <label htmlFor="price_product">Valor produto</label>
                        <input className={Style.inputEntrega} name='price_product' value={formData.price_product} onChange={(e) => setFormData({ ...formData, price_product: e.target.value })} type="number" />
                    </div>
                    <div className={Style.inputsCriarEntrega}>
                        <label htmlFor="zip_code">CEP</label>
                        <input className={Style.inputEntrega} name='zip_code' value={formData.zip_code} onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })} type="number" />
                    </div>
                    <div className={Style.inputsCriarEntrega}>
                        <label htmlFor="house_number">N° do imovel</label>
                        <input className={Style.inputEntrega} name='house_number' value={formData.house_number} onChange={(e) => setFormData({ ...formData, house_number: e.target.value })} type="number" />
                    </div>
                    <div className={Style.inputsCriarEntrega}>
                        <label htmlFor="code_tracking">Codigo de rastreio</label>
                        <input className={Style.inputEntrega} name='code_tracking' value={formData.code_tracking} onChange={(e) => setFormData({ ...formData, code_tracking: e.target.value })} type="text" />
                    </div>
                    <div className={Style.inputsCriarEntrega}>
                        <label htmlFor="status">Status atual do produto</label>
                        <input className={Style.inputEntrega} name='status' value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} type="text" />
                    </div>

                    <div className={Style.inputsCriarEntrega}>
                        <button className={Style.buttonEnviarCadastro} disabled={dadosEstaoCompletos} onClick={executarSubmit}>Criar Entrega</button>
                    </div>

                </div>


            </div>
        </section >
    )
}