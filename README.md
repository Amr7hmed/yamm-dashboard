# Octane Dashboard

## Description
Octane Dashboard is a React-based web application designed to manage orders and users efficiently. The project uses modern web development tools and libraries like Vite, Redux Toolkit, and React Router.

## Features
- Manage orders with functionalities to view, update status, and delete orders.
- User management with the ability to toggle user status and roles.
- Responsive design with Bootstrap for styling.
- JSON Server for simulating a backend API.

## Technologies Used
- React
- Redux Toolkit
- React Router
- TypeScript
- Bootstrap
- Sass
- JSON Server
- Jest & React Testing Library (for testing)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/octane-dashboard.git
   cd octane-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the JSON server:
   ```bash
   npm run start:server
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint for code linting.
- `npm run start:server`: Starts the JSON server on port 5000.
- `npm run test`: Runs the test suite.
- `npm run preview`: Serves the production build for preview.

## Folder Structure

```
├── src
│   ├── components 
│   │   ├── actions
│   │   │   ├── order-action.tsx # order Page Actions 
│   │   │   ├── user-action.tsx  # user Actions  
│   │   ├── header
│   │   │   ├── Header.tsx          # Navigation header
│   │   ├── table
│   │   │   ├── Table.tsx           # Reusable table component
│   │   ├── types
│   │   │   ├── Orders.ts # Typs order
│   │   │   ├── storeTypes.ts  # store All  
│   │   │   ├── Users.ts # Typs Users
│   ├── pages
│   │   ├── OrdersOverview.tsx  # Orders management page
│   │   ├── UsersOverview.tsx   # User management page
│   ├── redux
│   │   ├── slices
│   │   │   ├── ordersSlice.ts  # Redux slice for orders
│   │   │   ├── usersSlice.ts   # Redux slice for users
│   │   ├── store.ts            # Redux store setup
│   ├── styles
│   │   ├── modal.scss          # modal style
│   │   ├── table-responsive.scss    # table style
│   │   ├── main.scss           # Main Sass file
├── db.json                      # Mock database for JSON Server
```

## Testing

This project uses Jest and React Testing Library for testing.

### Running Tests
To execute the test suite, run:
```bash
npm run test
```

### Example Test Case
Here is an example test for a component:

```tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/table/Table';

// بيانات وهمية للاختبار
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

```

### Adding More Tests
To add more tests:
1. Create a new test file in the same directory as the component, e.g., `Header.test.tsx`.
2. Use Jest and React Testing Library to write test cases for your components or utilities.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to contribute to this project by submitting issues or pull requests!

