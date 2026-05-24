import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const existingUser = await this.userModel.findOne({
      email: signUpDto.email,
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.Password, 10);
    const user = new this.userModel({ ...signUpDto, Password: hashedPassword });
    await user.save();

    const payload = { email: user.email, role: user.role };
    return { token: this.jwtService.sign(payload) };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email: signInDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.Password,
      user.Password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, role: user.role };
    return { token: this.jwtService.sign(payload) };
  }

  async findAll(excludeEmail: string): Promise<User[]> {
    return this.userModel
      .find({ email: { $ne: excludeEmail } }, { Password: 0 })
      .exec();
  }
}
