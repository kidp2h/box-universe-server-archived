import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersRepository } from './users.repository';
import { hashSync } from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            this.password = hashSync(this.password, 10);
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService, UsersResolver, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
