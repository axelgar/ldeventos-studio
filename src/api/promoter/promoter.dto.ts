import { IsNotEmpty } from 'class-validator';
import { Promoter } from '@prisma/client';

export class FindAllPromotersDTO {
  @IsNotEmpty()
  skip!: number;
  @IsNotEmpty()
  limit!: number;
}

export class CreatePromoterDTO {
  @IsNotEmpty()
  name!: Promoter['name'];

  address?: Promoter['address'];
  code?: Promoter['code'];
  phoneNumber?: Promoter['phoneNumber'];
  website?: Promoter['website'];
}

export class UpdatePromoterDTO {
  @IsNotEmpty()
  id!: Promoter['id'];

  name?: Promoter['name'];
  logo?: Promoter['logo'];
  address?: Promoter['address'];
  code?: Promoter['code'];
  phoneNumber?: Promoter['phoneNumber'];
  website?: Promoter['website'];
}

export type GetUploadUrlForLogoDTO = {
  promoterId: string;
  origin: string;
  filename: string;
};
