class OrderList {
  orders = [];
  ordersService;

  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  init() {
    this.render();
  }

  _renderListRowItem = (order) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `order-${order.order_number}`; // order-1
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.id = 'delete-btn';
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(order.order_number));
    deleteBtn.appendChild(deleteBtnTxt);

    const orderNameSpan = document.createElement('span');
    const orderName = document.createTextNode(order.order_name);
    orderNameSpan.appendChild(orderName);

    const orderStatusSpan = document.createElement('span');
    const orderStatus = document.createTextNode(order.status);
    orderStatusSpan.append(orderStatus);

    const orderDateSpan = document.createElement('span');
    const orderDate = document.createTextNode(order.created_date);
    orderDateSpan.append(orderDate);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(orderNameSpan);
    listGroupItem.append(orderStatusSpan);
    listGroupItem.append(orderDateSpan);

    return listGroupItem;
  
  };

  _renderList = () => {
    // get the "Loading..." text node from parent element
    const ordersDiv = document.getElementById('orders');
    const loadingDiv = ordersDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'orders-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.orders.map((order) => {
      const listGroupRowItem = this._renderListRowItem(order);

      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    ordersDiv.replaceChild(fragment, loadingDiv);
  };

  _renderMsg = () => {
    const ordersDiv = document.getElementById('orders');
    const loadingDiv = ordersDiv.childNodes[0];
    const listParent = document.getElementById('orders-list');
    const msgDiv = this._createMsgElement('Create some new orders!');

    if (ordersDiv) {
      ordersDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      ordersDiv.replaceChild(msgDiv, listParent);
    }
  };

  addOrder = async (newOrder) => {
    try {
      const { order_name, status } = newOrder;
      await this.ordersService.addOrder({ order_name, status }); // we just want the name and status
      this.orders.push(newOrder); // push order with all it parts
    } catch (err) {
      console.log(err);
      alert('Unable to add order. Please try again later.');
    }
  };

  _addOrderEventHandler = () => {
    const orderInput = document.getElementById('formInputOrderName');
    const order_name = orderInput.value;

    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;

    // validation checks
    if (!order_name) {
      alert('Please enter a order name.');
      return;
    }

    const order = { order_name, status }; // assemble the new order parts
    const { newOrder, newOrderEl } = this._createNewOrderEl(order); // add order to list

    this.addOrder(newOrder);

    const listParent = document.getElementById('orders-list');

    if (listParent) {
      listParent.appendChild(newOrderEl);
    } else {
      this._renderList();
    }
    orderInput.value = ''; // clear form text input
  };

  _createNewOrderEl = (order) => {
    const order_number = this.orders.length;
    const created_date = new Date().toISOString();
    const newOrder = { ...order, order_number, created_date };
    const newOrderEl = this._renderListRowItem(newOrder);

    return { newOrder, newOrderEl };
  };

  deleteOrder = async (orderNumber) => {
    try {
      const res = await this.ordersService.deleteOrder(orderNumber);
      this.orders = this.orders.filter((order) => order.order_number !== orderNumber);

      if (res !== null) {
        alert('Order deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete order. Please try again later.');
    }
  };


  _deleteEventHandler = (orderNumber) => () => {
    const order = document.getElementById(`order-${orderNumber}`);
    order.remove();

    this.deleteOrder(orderNumber).then(() => {
      if (!this.orders.length) {
        this._renderMsg();
      }
    });
  };

  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const orders = await this.ordersService.getOrders();

    try {
      if (orders.length) {
        this.orders = orders;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}