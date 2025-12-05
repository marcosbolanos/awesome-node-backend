import { Controller, Get, Query, Res } from '@nestjs/common';
import { googleOAuthCallbackSchema } from 'src/auth/dto/auth-request.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {

}
