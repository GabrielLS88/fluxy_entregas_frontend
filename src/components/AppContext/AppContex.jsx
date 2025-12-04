import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import api from "../services/api";

const DeliveryContext = createContext();

export default function DeliveryProvider({ children }) {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    try {
      const { data } = await api.get("/api/entrega");
      setDeliveries(data);
    } catch (error) {
      console.error("Erro ao buscar entregas:", error);
      toast.error("Erro ao buscar entregas!");
    } finally {
      setLoading(false);
    }
  };

  const createDelivery = async (newDelivery) => {
    try {
      const { data } = await api.post("/api/entrega", newDelivery);
      setDeliveries((prev) => [...prev, data.data]);
      return { success: true, data: data.data };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data?.erro || "Erro ao criar entrega",
      };
    }
  };

  const updateDelivery = async (id, updatedDelivery) => {
    try {
      const { data } = await api.put(`/api/entrega/${id}`, updatedDelivery);
      setDeliveries((prev) =>
        prev.map((d) => (d.id_delivery === id ? data.data : d))
      );
      return { success: true, data: data.data };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data?.erro || "Erro ao atualizar entrega",
      };
    }
  };

  const deleteDelivery = async (id) => {
    try {
      await api.delete(`/api/entrega/${id}`);
      setDeliveries((prev) =>
        prev.filter((d) => d.id_delivery !== id)
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.erro || "Erro ao excluir entrega",
      };
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <DeliveryContext.Provider
      value={{
        deliveries,
        loading,
        refreshDeliveries: fetchDeliveries,
        createDelivery,
        updateDelivery,
        deleteDelivery,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDelivery deve ser usado dentro de DeliveryProvider");
  }
  return context;
}
