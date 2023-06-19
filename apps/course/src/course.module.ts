import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { OrmModule, SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from '@app/shared/entities/course.entity';
import { CourseRepository } from '@app/shared/repositories/course.repository';

@Module({
  imports: [
    SharedModule,
    OrmModule,
    TypeOrmModule.forFeature([CourseEntity])
  ],
  controllers: [CourseController],
  providers: [CourseService,{
    provide : "CourseRepositoryInterface",
    useClass : CourseRepository
  }],
})
export class CourseModule {}
