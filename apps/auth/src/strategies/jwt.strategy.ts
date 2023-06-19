import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt
            .fromExtractors([
                (request : any) => {
                    return request?.jwt;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKRN_SECRET,
        });
    }
    async validate(payload: any) {
        return { ...payload };
    }
}