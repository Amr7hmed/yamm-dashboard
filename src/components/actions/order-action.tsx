
import React from 'react';

interface ActionProps {
  Item: {
    id: string;
  };
  handleViewDetails: (id: string) => void;
  handleDelete: (id: string) => void;
}

const Action: React.FC<ActionProps> = ({ Item, handleViewDetails, handleDelete }) => {
  return (
    <div>
    <button className="btn btn-info" onClick={() => handleViewDetails(Item.id)}>View</button>
    <button className="btn btn-danger" onClick={() => handleDelete(Item.id)}>Delete</button>
    </div>
  );
};

export default Action;