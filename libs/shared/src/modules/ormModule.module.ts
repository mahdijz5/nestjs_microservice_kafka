import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport, } from '@nestjs/microservices';

import { SharedService } from '../shared.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserRoleEntity } from '../entities/junction-tables/userRole.entity';

@Module({
    imports: [
 
        TypeOrmModule.forRootAsync({
            useFactory: (configService:ConfigService) => ({
                type : "postgres",
                url : configService.get("POSTGRES_URI"),
                // username : configService.get("POSTGRES_USER"),
                // password : configService.get("POSTGRES_PASSWORD"),
                // port : parseInt(configService.get("POSTGRES_PORT")),
                // database : configService.get("POSTGRES_DB"),
                synchronize : true,
                autoLoadEntities : true,
            }),
            inject : [ConfigService]
        })
    ],
    providers: [SharedService],
    exports: [SharedService],
})
export class OrmModule { }