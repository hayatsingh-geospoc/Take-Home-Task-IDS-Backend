import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Resolver()
export class AuthResolver {
  constructor(private jwtService: JwtService) {}

  @Mutation(() => String)
  async login() {
    // For testing purposes, generate a token with a dummy user
    const payload = { userId: 'test-user' };
    return this.jwtService.sign(payload);
  }
} 