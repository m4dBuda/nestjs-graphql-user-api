import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserTypesEntity {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  type: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
