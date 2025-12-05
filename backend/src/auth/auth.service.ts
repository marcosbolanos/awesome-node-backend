import { Inject, Injectable } from '@nestjs/common';
import type { AuthClient } from 'lib/auth';

@Injectable()
export class AuthService {
  constructor(@Inject('BETTER_AUTH') private readonly auth: AuthClient) { }

  async signInGoogle() {
    const result = await this.auth.api.signInSocial({
      body: {
        provider: "google",
      },
    })
    return result
  }
}
