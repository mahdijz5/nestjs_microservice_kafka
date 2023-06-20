import {UseFilters, Controller, Get } from '@nestjs/common';
import { SeasonService } from './season.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { HttpExceptionFilter } from '@app/shared';

@UseFilters(HttpExceptionFilter)
@Controller()
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) { }
  @MessagePattern("get-all-seasons")
  async getAllSeasons(@Payload() data) {
    try {
      return { ...await this.seasonService.getAllSeason() }
    } catch (error) {
      throw error
    }
  }
  @MessagePattern("get-season")
  async getSeason(@Payload() data: { id: string }) {
    try {
      return { ...await this.seasonService.getSeason(data.id) }
    } catch (error) {
      throw error
    }
  }

  @MessagePattern("create-season")
  async createSeason(@Payload() data: CreateSeasonDto) {
    try {
      return await this.seasonService.createSeason(data) 
    } catch (error) {
      throw error
    }
  }

  @MessagePattern("edit-season")
  async editSeason(@Payload() data: UpdateSeasonDto) {
    try {
      return await this.seasonService.editSeason(data)
    } catch (error) {
      throw error
    }
  }

  @MessagePattern("remove-season")
  async removeSeason(@Payload() data: { id: string }) {
    try {
      return { ...await this.seasonService.removeSeason(data.id) }
    } catch (error) {
      throw error
    }
  }

}
