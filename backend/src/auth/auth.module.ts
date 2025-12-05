import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import type { Auth } from 'better-auth';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { auth } from 'lib/auth';

const corsOptions = { origin: '*' };

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: 'BETTER_AUTH', useValue: auth }
  ]
})
export class AuthModule implements OnModuleInit {
  constructor(
    private readonly adapterHost: HttpAdapterHost,
    @Inject('BETTER_AUTH') private readonly auth: Auth,
  ) { }

  onModuleInit() {
    const app = this.adapterHost.httpAdapter.getInstance();
    app.use(cors(corsOptions));

    app.all(
      // Regex that catches everything set to /api/auth
      /^\/api\/auth(\/.*)?$/,
      toNodeHandler(this.auth.handler)
    )
  }
}
