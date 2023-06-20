import { seasonRepositoryInterface } from '@app/shared/interfaces/season.repository.interface';
import {NotFoundException, Injectable,Inject ,BadRequestException} from '@nestjs/common';
import { CreateSeasonParams, updateSeasonParams } from './utils/types';

@Injectable()
export class SeasonService {
    constructor(@Inject("SeasonRepositoryInterface") private readonly seasonRepository : seasonRepositoryInterface){}
  async getAllSeason() {
    try {
      const seasons = await this.seasonRepository.findAll()
      return seasons
    } catch (error) {
      throw error
    }
  }

  async getSeason(id : string) {
    try {
      const season = await this.seasonRepository.findByCondition({where : {id}})
      return season      
    } catch (error) {
      throw error
    }
  }

  async createSeason(data : CreateSeasonParams) {
    try {
      const season = this.seasonRepository.create({...data});
      
      return {...await this.seasonRepository.save(season)}
    } catch (error) {
      throw error
    }
  }

  async editSeason(data : updateSeasonParams) {
    try {
      const season = await this.seasonRepository.findByCondition({where : {id : data.id}})
      if(!season) throw new NotFoundException()

      return {...await this.seasonRepository.save({
        ...season,
        ...data
      })}
    } catch (error) {
      throw error
    }
  }

  async removeSeason(id :string) {
    try {
      const season = await this.seasonRepository.findByCondition({where : {id}})
      if(!season) throw new NotFoundException()

      return await this.seasonRepository.remove(season)
    } catch (error) {
      throw error
    }
  }
}
