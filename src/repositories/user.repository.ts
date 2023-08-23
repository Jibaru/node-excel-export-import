export class User {
  constructor(
    private _id: string,
    private _firstName: string,
    private _lastName: string,
    private _age: number,
    private _yearOfBirth: number
  ) {
    if (this._age < 18) {
      throw new Error("La edad debe ser mayor a 18");
    }
  }

  public get yearOfBirth(): number {
    return this._yearOfBirth;
  }

  public get age(): number {
    return this._age;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get id(): string {
    return this._id;
  }
}

export class UserRepository {
  constructor(private users: Map<string, User>) {}

  public getAll(): User[] {
    return Array.from(this.users.values());
  }

  public save(user: User): void {
    this.users.set(user.id, user);
  }
}
