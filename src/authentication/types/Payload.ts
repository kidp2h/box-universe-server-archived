import { User } from '@users/users.schema';
import { ObjectId } from 'mongodb';

export type Payload = Pick<User, 'username'> & { sub: string | ObjectId };
