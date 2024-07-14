export class CartItem {
    constructor(
        public productId: number,
        public prodctName: string,
        public quantity: number,
        public price: number
    ){}
    get totalPrince(): number {
        return this.quantity * this.price;
    }
}