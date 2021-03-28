import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return await this.repository.findOneOrFail({id:user_id}, {relations:['games']});
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * FROM users ORDER BY first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {

    const fistFormated = first_name.toLocaleLowerCase();
    const lastFormated = last_name.toLocaleLowerCase();

    return await this.
    repository.
    query(
      `SELECT first_name, last_name, email 
    FROM users WHERE lower(first_name) = lower('${fistFormated}') and lower(last_name) = lower('${lastFormated}')`
    ); // Complete usando raw query
  }
}
