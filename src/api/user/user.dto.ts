import { IsNotEmpty } from 'class-validator';
import { User } from '@prisma/client';

export class CreateUserDTO {
  @IsNotEmpty()
  email!: User['email'];

  @IsNotEmpty()
  name!: User['name'];

  role?: User['role'];
  image?: User['image'];
  mobileNumber?: User['mobileNumber'];
}
