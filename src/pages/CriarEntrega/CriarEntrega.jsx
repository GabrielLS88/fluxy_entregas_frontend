import Style from './CriarEntrega.module.css';
import NaveBar from '../../components/NaveBar/NaveBar.jsx';
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useDelivery } from "../../components/AppContext/AppContex.jsx";

export default function CriarEntrega() {
  const { createDelivery } = useDelivery();

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
    const todosPreenchidos = Object.values(formData).every((value) => value !== "");
    setDadosEstaoCompletos(!todosPreenchidos);
  }, [formData]);

  const executarSubmit = async () => {
    const regexNumeros = /^[0-9]+$/;

    if (
      !regexNumeros.test(formData.code_product) ||
      !regexNumeros.test(formData.price_product) ||
      !regexNumeros.test(formData.zip_code) ||
      !regexNumeros.test(formData.house_number)
    ) {
      toast.error("Código do produto, Valor, CEP e Nº do imóvel devem conter apenas números!");
      return;
    }

    const result = await createDelivery(formData);

    if (result.success) {
      toast.success("Entrega criada com sucesso!");
      setFormData({
        product: '',
        code_product: '',
        price_product: '',
        zip_code: '',
        house_number: '',
        code_tracking: '',
        status: ''
      });
    } else {
      toast.error("Erro ao criar entrega!");
      console.error(result.data);
    }
  };

  return (
    <section className={Style.sectionPageCriarEntregas}>
      <NaveBar />

      <div className={Style.containerPageCriarEntregas}>
        <div className={Style.spaceParaTituloModal}>
          <h2 className={Style.tituloSpaceModal}>Dados para criar entrega</h2>
        </div>

        <div className={Style.spaceInputsCriarEntrega}>
          <div className={Style.inputsCriarEntrega}>
            <label>Nome do produto</label>
            <input
              className={Style.inputEntrega}
              name="product"
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            />
          </div>

          <div className={Style.inputsCriarEntrega}>
            <label>Código do produto</label>
            <input
              className={Style.inputEntrega}
              name="code_product"
              type="text"
              value={formData.code_product}
              onChange={(e) => setFormData({ ...formData, code_product: e.target.value })}
            />
          </div>

          <div className={Style.inputsCriarEntrega}>
            <label>Valor do produto</label>
            <input
              className={Style.inputEntrega}
              name="price_product"
              type="number"
              value={formData.price_product}
              onChange={(e) => setFormData({ ...formData, price_product: e.target.value })}
            />
          </div>

          <div className={Style.inputsCriarEntrega}>
            <label>CEP</label>
            <input
              className={Style.inputEntrega}
              name="zip_code"
              type="number"
              value={formData.zip_code}
              onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
            />
          </div>

          <div className={Style.inputsCriarEntrega}>
            <label>Nº do imóvel</label>
            <input
              className={Style.inputEntrega}
              name="house_number"
              type="number"
              value={formData.house_number}
              onChange={(e) => setFormData({ ...formData, house_number: e.target.value })}
            />
          </div>

          <div className={Style.inputsCriarEntrega}>
            <label>Código de rastreio</label>
            <input
              className={Style.inputEntrega}
              name="code_tracking"
              type="text"
              value={formData.code_tracking}
              onChange={(e) => setFormData({ ...formData, code_tracking: e.target.value })}
            />
          </div>

          <div className={Style.inputsCriarEntrega}>
            <label>Status atual do produto</label>
            <input
              className={Style.inputEntrega}
              name="status"
              type="text"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </div>

        </div>
        <div className={Style.inputsCriarEntrega}>
          <button
            className={Style.buttonEnviarCadastro}
            onClick={executarSubmit}
            disabled={dadosEstaoCompletos}
          >
            Criar Entrega
          </button>
        </div>
      </div>
    </section>
  );
}
