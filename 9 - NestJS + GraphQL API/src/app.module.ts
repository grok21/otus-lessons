import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './users/users.module' 

@Module({
  imports: [ 
    GraphQLModule.forRoot({   
      autoSchemaFile: true
    }),
    UserModule 
  ]
})
export class AppModule {}
