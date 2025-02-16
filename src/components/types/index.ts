export interface Order {
    id: string;
    reason: string;
    store_name: string;
    store_logo: string;
    store_url: string;
    amount: number;
    active: boolean;
    decision: string | null;
    items: { 
      name: string; 
      id: string; 
      price: number; 
      quantity: number; 
    }[];
  }
  
  export interface OrderTableProps {
    data: Order[];
    onToggleStatus: (id: string) => void;
    onChangeDecision: (id: string, decision: string) => void;
  }
  export interface OrderRowProps {
    order: Order;
    onToggleStatus: (id: string) => void;
    onChangeDecision: (id: string, decision: string) => void;

  }