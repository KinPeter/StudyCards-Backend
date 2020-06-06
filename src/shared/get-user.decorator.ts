import { createParamDecorator } from '@nestjs/common';
import { UserDocument } from 'src/auth/user.model';

export const GetUser = createParamDecorator(
  (data, req): UserDocument => {
    return req.user;
  },
);
