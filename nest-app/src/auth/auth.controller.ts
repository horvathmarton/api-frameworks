import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { User } from 'src/models';
import { SignInPayload, SignUpPayload } from 'src/payloads';
import { getRepository } from 'typeorm';
import { AuthService } from './auth.service';
import { Role } from './roles.decorator';

interface TokenResponse {
  token: string;
}

@Controller('auth')
export class AuthController {
  private readonly SALT_ROUNDS = 10;

  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @Role('anonymous')
  public async signIn(@Body() payload: SignInPayload): Promise<TokenResponse> {
    const { username, password } = payload;

    const user = await getRepository(User).findOne(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const passwordCorrect = compareSync(password, user.passwordHash);

    if (!passwordCorrect) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    return { token: this.authService.createToken(username, user.isAdmin) };
  }

  @Post('sign-up')
  @Role('anonymous')
  public async signUp(@Body() payload: SignUpPayload): Promise<TokenResponse> {
    const { username, fullName, password } = payload;

    const isRegistered = (await getRepository(User).count({ username })) >= 1;

    if (isRegistered) {
      throw new ConflictException('Username is registered already.');
    }

    await getRepository(User).save({
      username,
      fullName,
      passwordHash: hashSync(password, this.SALT_ROUNDS),
      isAdmin: false,
    });

    return { token: this.authService.createToken(username, false) };
  }
}
