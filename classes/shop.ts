import {Buyer} from './buyer';

class Shop {
    buyers: { id: number, buyer: Buyer }[] = new Array();
    month_sum: number = 0;

    constructor(buyers: { id: number, buyer: Buyer; }[]) {
        this.buyers = buyers;
    };

    private monthSum(numberOfMonth: number): number {
        for (let i = 0; i < this.buyers.length; i++) {
            for (let j = 0; j < this.buyers[i].buyer.orders.length; j++)
            {
                if ((typeof this.buyers[i].buyer.orders[j].order_date) == 'string')
                var tempdate = new Date(this.buyers[i].buyer.orders[j].order_date);
                else var tempdate = this.buyers[i].buyer.orders[j].order_date;

                if (tempdate.getMonth() + 1 == numberOfMonth) {
                    this.month_sum += this.buyers[i].buyer.orders[j].order_cost;
                };
            };  
        };
        return this.month_sum;
    };

    set setBuyers( buyers: { id: number, buyer: Buyer }[] ) { this.buyers = buyers; };

    private getSum(numberOfMonth: number) { 
        if (numberOfMonth > 0 && numberOfMonth < 13)
            return this.monthSum(numberOfMonth); 
        else {
            console.log ("Check the number of month.");
            return 0;
        };
    };

    public readBuyers(numberOfMonth: number): string {
        this.month_sum = 0;
        let list: string = JSON.stringify(this.buyers) + "\nSum per month: " + this.getSum(numberOfMonth);
        return list;
    };
};

export { Shop };