import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  status!: number;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  data?: T;

  @ApiProperty()
  token?: string;
}
