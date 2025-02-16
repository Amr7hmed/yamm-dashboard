# Yamm Dashboard

## Description

Yamm Dashboard is a React-based web application designed to manage refund orders efficiently. The project utilizes modern web development tools and libraries like React.js, Mui, and React Query.

## Features
- Display a list of refund orders with all necessary details.
- Manage order decisions through a dropdown menu (Reject, Accept, Escalate).
- Toggle order status between active and inactive using a switch.
- Navigate to a detailed order page by clicking an icon button.
- A reusable and configurable table component for data display.
- Instant updates to the table without page reloads.
- Notification toasters for user actions.
- Pagination with a maximum of 3 orders per page.
- RESTful API integration with proper loading and error handling states.

## Technologies Used
- React
- React Query
- TypeScript
- Mui
- JSON Server

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/yamm-dashboard.git
   cd yamm-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the JSON server:
   ```bash
   npx json-server --watch db.json --port 5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
##  Usage
- Navigate to Orders Page: Displays refund orders in a paginated table.
- Update Order Decision: Use the dropdown to accept, reject, or escalate orders.
- Toggle Order Status: Switch between active/inactive.
- View Order Details: Click the icon to navigate to a detailed order view.

## Scripts
- `npm run dev`: Starts the development server.
## Folder Structure

```
├── src
│   ├── components 
│   │   ├── ordersTable
│   │   │   ├── index.tsx 
│   │   │   ├── OrderRow.tsx 
│   │   │   ├── TableHead.tsx   
│   │   ├── sideBar
│   │   │   ├── index.tsx
│   │   │   ├── SidebarItem.tsx
│   │   │   ├── SidebarList.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   ├── types
│   │   │   ├── order.ts # Typs order
│   ├── pages
│   │   ├── RefundOrders.tsx   
│   │   ├── OrderDetails.tsx  
│   ├── theme
│   │   ├── ThemeContext.tsx  
├── db.json                      # Mock database for JSON Server

## Contact

Author: @Amr7hmed