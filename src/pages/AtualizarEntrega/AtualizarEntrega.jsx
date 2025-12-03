import Style from './AtualizarEntrega.module.css';
import NaveBar from '../../components/NaveBar/NaveBar.jsx';
import { useState } from 'react';
import { toast } from "sonner";
import { useDelivery } from "../../components/AppContext/AppContex.jsx";

export default function AtualizarEntrega() {
  const { updateDelivery, deleteDelivery, refreshDeliveries, deliveries } = useDelivery();

  const [idEntrega, setIdEntrega] = useState("");
  const [entregaEncontrada, setEntregaEncontrada] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    code_product: '',
    price_product: '',
    zip_code: '',
    house_number: '',
    code_tracking: '',
    status: '',
    createdAt: '',
    deliveryDate: ''
  });

  // Função para converter ISO → YYYY-MM-DD (para input type="date")
  function converterParaInputDate(dataISO) {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    const ano = data.getUTCFullYear();
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
    const dia = String(data.getUTCDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }

  const buscarEntrega = () => {
    const entrega = deliveries.find((d) => d._id == idEntrega);

    if (!entrega) {
      toast.error("Nenhuma entrega encontrada com esse ID");
      return;
    }

    // Converte datas para o input date
    setFormData({
      ...entrega,
      createdAt: converterParaInputDate(entrega.createdAt),
      deliveryDate: converterParaInputDate(entrega.deliveryDate)
    });

    setEntregaEncontrada(true);
    toast.success("Entrega encontrada com sucesso!");
  };

  const salvarAtualizacao = async () => {
    const result = await updateDelivery(idEntrega, formData);

    if (result.success) {
      toast.success("Entrega atualizada!");
      refreshDeliveries();
    } else {
      toast.error("Erro ao atualizar entrega!");
    }
  };

  const removerEntrega = async () => {
    const confirm = window.confirm("Tem certeza que deseja excluir essa entrega?");
    if (!confirm) return;

    const result = await deleteDelivery(idEntrega);

    if (result.success) {
      toast.success("Entrega excluída com sucesso!");
      setEntregaEncontrada(false);
      setIdEntrega("");
      refreshDeliveries();
    } else {
      toast.error("Erro ao excluir entrega!");
    }
  };

  return (
    <section className={Style.sectionPageAtualizarEntregas}>
      <NaveBar />

      <div className={Style.containerPageAtualizarEntregas}>
        <div className={Style.spaceParaTituloModal}>
          <h2 className={Style.tituloSpaceModal}>Buscar entrega para atualizar</h2>
        </div>

        <div className={Style.spaceInputsAtualizarEntrega}>
          <div className={Style.inputsAtualizarEntrega}>
            <label>Digite o ID da entrega</label>
            <input
              className={Style.inputEntrega}
              placeholder='Você pode localizar esse ID nas entregas presentes na tela inicial'
              value={idEntrega}
              onChange={(e) => setIdEntrega(e.target.value)}
              type="text"
            />
          </div>
        </div>

        <div className={Style.inputsAtualizarEntrega}>
          <button
            className={Style.buttonBuscarCadastro}
            onClick={buscarEntrega}
          >
            Buscar Entrega
          </button>
        </div>
      </div>

      {entregaEncontrada && (
        <div className={Style.containerPageAtualizarEntregas}>
          <div className={Style.spaceParaTituloModal}>
            <h2 className={Style.tituloSpaceModal}>Atualizar entrega</h2>
          </div>

          <div className={Style.spaceInputsAtualizarEntrega}>

            {Object.keys(formData).map((key) => {
              if (key === "_V" || key === "__v" || key === "updatedAt") return null;

              const value = formData[key];

              return (
                <div className={Style.inputsAtualizarEntrega} key={key}>
                  <label>{key.replace("_", " ").toUpperCase()}</label>

                  <input
                    className={Style.inputEntrega}

                    type={
                      key === "createdAt" || key === "deliveryDate"
                        ? "date"
                        : key.includes("price") || key.includes("zip")
                          ? "number"
                          : "text"
                    }

                    value={value}

                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]: e.target.value
                      })
                    }
                  />
                </div>
              );
            })}


          </div>
          <div className={Style.buttonsActions}>
            <button
              className={Style.buttonEnviarCadastro}
              onClick={salvarAtualizacao}
            >
              Atualizar
            </button>

            <button
              className={Style.buttonExcluir}
              onClick={removerEntrega}
            >
              Excluir Entrega
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
