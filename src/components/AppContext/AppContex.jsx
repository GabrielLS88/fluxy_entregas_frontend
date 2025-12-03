import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const DeliveryContext = createContext();

export default function DeliveryProvider({ children }) {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const tokenApi = import.meta.env.VITE_TOKEN_API_URL;

  const fetchDeliveries = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/entrega`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": tokenApi,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setDeliveries(data);
      } else {
        toast.error("Erro ao buscar entregas!");
        console.error(data.erro);
      }
    } catch (error) {
      console.error("Erro ao buscar entregas:", error);
      toast.error("Erro ao buscar entregas!");
    } finally {
      setLoading(false);
    }
  };

  const createDelivery = async (newDelivery) => {
    try {
      const response = await fetch(`${apiUrl}/api/entrega`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": tokenApi,
        },
        body: JSON.stringify(newDelivery),
      });

      const data = await response.json();

      if (response.ok) {
        setDeliveries((prev) => [...prev, data.data]);
        return { success: true, data: data.data };
      } else {
        console.error(data.erro);
        return { success: false, data: data.erro };
      }
    } catch (error) {
      console.error("Erro ao criar entrega:", error);
      return { success: false, data: error };
    }
  };

  const updateDelivery = async (id, updatedDelivery) => {
    try {
      const response = await fetch(`${apiUrl}/api/entrega/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": tokenApi,
        },
        body: JSON.stringify(updatedDelivery),
      });

      const data = await response.json();

      if (response.ok) {
        setDeliveries((prev) =>
          prev.map((d) => (d.id_delivery === id ? data.data : d))
        );
        return { success: true, data: data.data };
      } else {
        return { success: false, data: data.erro };
      }
    } catch (error) {
      console.error("Erro ao atualizar entrega:", error);
      return { success: false, data: error };
    }
  };

  const deleteDelivery = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/entrega/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": tokenApi,
        },
      });

      if (response.status === 204) {
        setDeliveries((prev) => prev.filter((d) => d.id_delivery !== id));
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, message: data.erro };
      }
    } catch (error) {
      console.error("Erro ao excluir entrega:", error);
      return { success: false, message: "Erro ao excluir entrega" };
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
