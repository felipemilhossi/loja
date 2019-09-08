export class User {
    constructor(
        public user: string,
        public name: string,
        public email: string,
        public roles: string[],
        public token: string,
    ) {


    }
}