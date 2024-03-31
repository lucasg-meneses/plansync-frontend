export default class UserModel {
    private login: string = '';
    private password: string = '';
    private email: string = '';

    constructor(login: string, password: string, email: string) {
        this.login = login;
        this.password = password;
        this.email = email;
    }

    getLogin(): string {
        return this.login;
    }

    setLogin(value: string): void {
        this.login = value;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(value: string): void {
        this.password = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string): void {
        this.email = value;
    }
}
