export interface User {
    id: string,
    token: string,
    username: string,
    email: string,
    name: string, // nane is for server, username is for client side object
}