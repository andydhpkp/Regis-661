const ordersService = new OrdersService();
const order = new OrderList(ordersService);

describe('Order App', () => {
  it('should initialize some HTML', () => {
    spyOn(order, 'init');
    order.init();

    expect(order.init).toHaveBeenCalled();
  });

  it('should add an order', async () => {
    const newOrder = {
      order_number: 0,
      order_name: 'New Order',
      status: 'pending',
      created_date: '2022-04-14 17:45:42',
    };
    const addOrderServiceSpy = spyOn(ordersService, 'addOrder');

    expect(order.orders.length).toBe(0);

    await order.addOrder(newOrder);

    expect(addOrderServiceSpy).toHaveBeenCalled();
    expect(order.orders.length).toBe(1);
  });

  it('should delete an order', async () => {
    const existingOrder = {
      order_number: 0,
      order_name: 'New Order',
      status: 'pending',
      created_date: '2022-04-14 17:45:42',
    };
    const deleteOrderServiceSpy = spyOn(ordersService, 'deleteOrder');

    expect(order.orders.length).toBe(1);

    await order.deleteOrder(existingOrder.order_number);

    expect(deleteOrderServiceSpy).toHaveBeenCalled();
    expect(order.orders.length).toBe(0);
  });
});