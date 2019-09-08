export class Product {
    constructor(
        public code: string,
        public title: string,
        public price: number,
        public description: string,
        public quantity: number,
        public productClass: string
    ) {

    }
}