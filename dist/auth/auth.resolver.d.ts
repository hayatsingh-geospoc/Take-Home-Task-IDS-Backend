import { JwtService } from '@nestjs/jwt';
export declare class AuthResolver {
    private jwtService;
    constructor(jwtService: JwtService);
    login(): Promise<string>;
}
