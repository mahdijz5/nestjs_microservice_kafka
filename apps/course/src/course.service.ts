import { courseRepositoryInterface } from '@app/shared/interfaces/course.repository.interface';
import {NotFoundException, Injectable,Inject ,BadRequestException} from '@nestjs/common';
import { CreateCourseParams, updateCourseParams } from './utils/types';

@Injectable()
export class CourseService {
    constructor(@Inject("CourseRepositoryInterface") private readonly courseRepository : courseRepositoryInterface){}
  async getAllCourse() {
    try {
      const courses = await this.courseRepository.findAll()
      return courses
    } catch (error) {
      throw error
    }
  }

  async getCourse(id : string) {
    try {
      const course = await this.courseRepository.findByCondition({where : {id}})
      return course      
    } catch (error) {
      throw error
    }
  }

  async createCourse(data : CreateCourseParams) {
    try {
      const isExist = await this.courseRepository.findByCondition({where : {name : data.name}})
      if(isExist) throw new BadRequestException()

      const course = this.courseRepository.create(data);
      
      return await this.courseRepository.save(course)
    } catch (error) {
      throw error
    }
  }

  async editCourse(data : updateCourseParams) {
    try {
      const course = await this.courseRepository.findByCondition({where : {id : data.id}})
      if(!course) throw new NotFoundException()

      return await this.courseRepository.save({
        ...course,
        ...data
      })
    } catch (error) {
      throw error
    }
  }

  async removeCourse(id :string) {
    try {
      const course = await this.courseRepository.findByCondition({where : {id}})
      if(!course) throw new NotFoundException()

      return await this.courseRepository.remove(course)
    } catch (error) {
      throw error
    }
  }
}
