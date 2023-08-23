import { User, UserRepository } from "../repositories/user.repository";
import { Import } from "./import";

export class UsersImport extends Import<User> {
  constructor(private readonly userRepository: UserRepository) {
    super();
    this.validateBeforeAnyImport = true;
  }

  public map(row: any): User {
    return new User(
      row["ID"],
      row["Nombre"],
      row["Apellidos"],
      row["Edad"],
      row["Año de nacimiento"]
    );
  }

  public validate(user: User): void {
    // do some extra validations
  }

  public onRow(user: User): void {
    this.userRepository.save(user);
  }
}
