import { Controller, Get, Query, Res, InternalServerErrorException } from '@nestjs/common';
import type { Response } from 'express'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('google/signin')
  async getCodeGoogle(@Res() res: Response) {
    const result = await this.authService.signInGoogle();
    if (!result.url) {
      throw new InternalServerErrorException('Failed to generate Google OAuth URL');
    }
    return res.redirect(result.url);
  }
}
