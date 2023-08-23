import { User, UserRepository } from "../repositories/user.repository";
import { Export } from "./export";

export class UsersExport extends Export<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(new Date().getTime() + "-" + "users.xlsx");
  }

  public headers(): string[] {
    return ["ID", "Nombre", "Apellidos", "Edad", "Año de nacimiento"];
  }

  public content(): User[] {
    return this.userRepository.getAll();
  }

  public map(user: User): any[] {
    return [
      user.id,
      user.firstName.toUpperCase(),
      user.lastName.toUpperCase(),
      user.age,
      user.yearOfBirth,
    ];
  }
}
