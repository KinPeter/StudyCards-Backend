import { createParamDecorator, ForbiddenException } from '@nestjs/common';
import { UserDocument } from 'src/auth/user.model';

export const GetUserAndAuthorize = createParamDecorator(
  (data, req): UserDocument => {
    if (req.user.id !== req.params.userId) {
      throw new ForbiddenException();
    }
    return req.user;
  },
);
