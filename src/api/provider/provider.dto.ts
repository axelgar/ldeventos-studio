import { IsNotEmpty } from 'class-validator';
import { Provider } from '@prisma/client';

export class FindAllProvidersDTO {
  @IsNotEmpty()
  skip!: number;
  @IsNotEmpty()
  limit!: number;
}

export class CreateProviderDTO {
  @IsNotEmpty()
  name!: Provider['name'];

  contactName?: Provider['contactName'];
  email?: Provider['email'];
  phoneNumber?: Provider['phoneNumber'];
  mobileNumber?: Provider['mobileNumber'];
  fax?: Provider['fax'];
}

export class UpdateProviderDTO {
  @IsNotEmpty()
  id!: Provider['id'];

  name?: Provider['name'];
  contactName?: Provider['contactName'];
  email?: Provider['email'];
  phoneNumber?: Provider['phoneNumber'];
  mobileNumber?: Provider['mobileNumber'];
  fax?: Provider['fax'];
}
