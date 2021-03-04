import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import Admin from '../../entities/Admin';
import { isProd } from '../constants';

export function createAccessToken(user: Admin) {
  const token = {
    userId: user.id,
  };

  return jwt.sign(token, process.env.ACCESS_SECRET!, {
    expiresIn: '15m',
  });
}

export function createRefreshToken(user: Admin) {
  const token = {
    userId: user.id,
  };

  return jwt.sign(token, process.env.REFRESH_SECRET!, {
    expiresIn: '7d',
  });
}

export function setTokenCookie(ctx: Context, accessToken: string, refreshToken: string) {
  ctx.cookies.set('accessToken', accessToken, {
    httpOnly: false,
    domain: isProd ? '.thewhy.kr' : undefined,
    sameSite: 'lax',
    secure: isProd && true,
  });

  ctx.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    domain: isProd ? '.thewhy.kr' : undefined,
    sameSite: 'lax',
    secure: isProd && true,
  });
}
