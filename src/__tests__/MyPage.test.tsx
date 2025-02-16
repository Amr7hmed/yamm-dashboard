import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../redux/slices/orderSlice';
import OrdersOverview from '../pages/RefundOrders';


const store = createStore(reducer);

describe('MyPage', () => {
  it('should render correctly with Redux state', () => {
    render(
      <Provider store={store}>
        <OrdersOverview />
      </Provider>
    );
    
    expect(screen.getByText(/some text/i)).toBeInTheDocument();
  });
});
