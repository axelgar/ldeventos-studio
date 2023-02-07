import { IsNotEmpty } from 'class-validator';
import { User } from '@prisma/client';

export class CreateUserDTO {
  @IsNotEmpty()
  email!: User['email'];

  @IsNotEmpty()
  name!: User['name'];

  role?: User['role'];
  image?: string;
  mobileNumber?: User['mobileNumber'];
}

export class UpdateUserDTO {
  @IsNotEmpty()
  id!: User['id'];

  email!: User['email'];
  name!: User['name'];
  role?: User['role'];
  image?: string;
  mobileNumber?: User['mobileNumber'];
}
