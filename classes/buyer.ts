class Buyer {
    id: number;
    orders: { order_date: Date, order_cost: number }[] = new Array();
    orders_sum: number = 0;

    constructor(orders: { order_date: Date; order_cost: number; }[]) {
        this.orders = orders;
    };

    private ordersSum(numberOfMonth: number): number {
        for (let i = 0; i < this.orders.length; i++) {
            if ((typeof this.orders[i].order_date) == 'string')
                var tempdate = new Date(this.orders[i].order_date);
            else var tempdate = this.orders[i].order_date;

            if (tempdate.getMonth() + 1 == numberOfMonth) {
                this.orders_sum += this.orders[i].order_cost;
            };
        };
        return this.orders_sum;
    };

    set setOrders(orders: { order_date: Date; order_cost: number; }[]) { this.orders = orders; };

    private getSum(numberOfMonth: number) { 
        if (numberOfMonth > 0 && numberOfMonth < 13)
            return this.ordersSum(numberOfMonth); 
        else console.log('Check the number of month');
    };

    public readOrders(numberOfMonth: number): string {
        this.orders_sum = 0;
        let list: string = JSON.stringify(this.orders) + "\nSum per month: " + this.getSum(numberOfMonth);
        return list;
    }

    get getOrders()       { return this.orders; };

    public newOrder(orders: { order_date: Date; order_cost: number;} ): number {
        let newlenght: number = this.orders.push(orders);
        return newlenght;
    };

    public cancelOrder(order_num: number) {
        console.log(this.orders);
        for (let i = 0; i < this.orders.length; i++) {
            if (i === order_num) {
                this.orders.splice(order_num - 1, 1);
                console.log(this.orders);
            };
        };
    };
};

export { Buyer };