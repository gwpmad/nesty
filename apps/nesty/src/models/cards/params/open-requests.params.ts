import { IsString, IsUUID } from 'class-validator';
export class OpenRequestsParams {
  @IsString()
  @IsUUID()
  cardId: string;
}
