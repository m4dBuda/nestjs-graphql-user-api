import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AppUserLoginEntity {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Number)
  idUserType: number;

  @Field(() => String)
  type: string;

  @Field(() => String)
  token: string;
}
