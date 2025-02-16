import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, updateOrderStatus, updateOrderDecision } from "../api/server";
import TableComponent from "../components/ordersTable";

const RefundOrders: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) => updateOrderStatus(id, active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  const changeDecisionMutation = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: string }) => updateOrderDecision(id, decision),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching orders!</p>;

  return (
    <TableComponent
      data={orders}
      onToggleStatus={(id) => toggleStatusMutation.mutate({ id, active: !orders.find((order: { id: string; }) => order.id === id)?.active })}
      onChangeDecision={(id, decision) => changeDecisionMutation.mutate({ id, decision })}
    />
  );
};

export default RefundOrders;
