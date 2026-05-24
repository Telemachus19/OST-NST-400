import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Min,
  Max,
  Matches,
  IsNumber,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Password must be alphanumeric' })
  Password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNumber()
  @Min(16)
  @Max(60)
  age: number;

  @ApiProperty()
  @IsString()
  @Matches(/^01[0-9]{9}$/, {
    message: 'Mobile number must be 11 characters starting with 01',
  })
  mobileNumber: string;

  @ApiProperty({ enum: ['admin', 'normal'], default: 'normal' })
  @IsString()
  @Matches(/^(admin|normal)$/)
  role: string;
}
