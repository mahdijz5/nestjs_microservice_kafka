import { Controller, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) { }
  @MessagePattern("get-all-courses")
  async getAllCourses(@Payload() data) {
    try {
      return { ...await this.courseService.getAllCourse() }
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("get-course")
  async getCourse(@Payload() data: { id: string }) {
    try {
      return { ...await this.courseService.getCourse(data.id) }
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("create-course")
  async createCourse(@Payload() data: CreateCourseDto) {
    try {
      return { ...await this.courseService.createCourse(data) }
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("edit-course")
  async editCourse(@Payload() data: UpdateCourseDto) {
    try {
      return { ...await this.courseService.editCourse(data) }
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("remove-course")
  async removeCourse(@Payload() data: { id: string }) {
    try {
      return { ...await this.courseService.removeCourse(data.id) }
    } catch (error) {
      throw error
    }
  }

}
