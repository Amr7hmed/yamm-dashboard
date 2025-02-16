import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/table/Table';

// Fake test data
const mockData = [
  { id: '1', name: 'Order 1', status: 'Pending' },
  { id: '2', name: 'Order 2', status: 'Shipped' },
];

const mockColumns = [
  { key: 'id', label: 'ID', title: 'ID' },
  { key: 'name', label: 'Name', title: 'Name' },
  { key: 'status', label: 'Status', title: 'Status' },
];

describe('TableComponent', () => {
  it('renders table headers correctly', () => {
    const MockActions = () =>{
        return <button>Delete</button>
    };
    render(<Table data={mockData} columns={mockColumns} Actions={MockActions} />);
    mockColumns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it('renders table rows correctly', () => {
    const MockActions = () => {
        return <button>Delete</button>;
    };
    render(<Table data={mockData} columns={mockColumns} Actions={MockActions} />);
    mockData.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
    });
  });

  it('handles row delete correctly', () => {
    const handleDelete = jest.fn();
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        Actions={handleDelete}
      />
    );

  });
});
