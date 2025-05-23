import { v4 as uuidv4 } from 'uuid';
import { IsUUID, IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsUUID()
  public id: string;

  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  constructor(name: string, email: string, id?: string) {
    this.name = name;
    this.email = email;
    this.id = id ?? uuidv4();
  }
}
