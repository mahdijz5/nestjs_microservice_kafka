import { Module } from '@nestjs/common';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';
import { OrmModule, SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonEntity } from '@app/shared/entities/season.entity';
import { SeasonRepository } from '@app/shared/repositories/season.repository';

@Module({
  imports: [
    SharedModule,
    OrmModule,
    TypeOrmModule.forFeature([SeasonEntity])
  ],
  controllers: [SeasonController],
  providers: [SeasonService,{
    provide : "SeasonRepositoryInterface",
    useClass : SeasonRepository
  }],
})
export class SeasonModule {}
