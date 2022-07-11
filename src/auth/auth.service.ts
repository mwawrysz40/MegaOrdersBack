import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { JwtPayload } from './jwt.strategy';
import { sign } from 'jsonwebtoken';
import { User } from '../user/user.entity';
import { v4 as uuid } from 'uuid';
import { AuthLoginDto } from './dto/auth-login.dto';
import { hashPwd } from '../utils/pwd';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    @Inject(UserService) private userService: UserService,
  ) {
  }

  private createToken(currentTokenId: string): {accessToken: string, expiresIn: number} {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, 'JDwoi doi o#OOI F#3fOAoJF*#fooiN hf3OIC OJ o jf#OJCOjoJFo#CO#CoqCMoc#OCMOIDoij oCOMowCOcO#OI3J*#*#*#* FfjCNoo@w*&$08@*&@)*#)(C p9', { expiresIn });
    return {
      accessToken,
      expiresIn,
    };
  };

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOneBy({ token: token });
    } while (!!userWithThisToken);
    user.token = token;
    await user.save();

    return token;
  };

  async login(req: AuthLoginDto, res: Response): Promise<any> {

    try {
      const user = await User.findOneBy({
        login: req.login,
        pass: hashPwd(req.pass),
      });
      if (!user) {
        return res.json({error: 'Błędny login lub hasło!'});
      }

      const token = this.createToken(await this.generateToken(user));

       return res.cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        }).json({ok: true});
    } catch (e) {
      return res.send;
    }
  };

  async logout(user: User, res: Response) {
    try {
      user.token = null;
      await user.save();
      res.clearCookie(
        'jwt',
        {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        }
      );
      return res.json({ok: true});
    } catch (e) {
      return res.json({error: e.message});
    }
  }
}
