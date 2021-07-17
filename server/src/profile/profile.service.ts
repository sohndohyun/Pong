import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/index';
import { InjectRepository } from '@nestjs/typeorm'
import {ft_user} from '../Entity/User.entity'
import { match_history } from 'src/Entity/MatchHistory.entity';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(ft_user) private readonly UserRepository: Repository<ft_user>,
		@InjectRepository(match_history) private readonly MatchHistoryRepository: Repository<match_history>
	){}

	async getProfile(myID, otherID){
		const history = [{win:true, p2:'jinkim'}, {win:true, p2:'taekkim'}, {win:false, p2:'jachoi'}, {win:false, p2:'dsohn'}]
		const win = 2
		const lose = 2
		if (myID === otherID)
		{
			return ({history:history, win:win, lose:lose})
		}
		else
		{
			const info = await this.UserRepository.findOne({nickname:myID})
			var isF = false;
			var isB = false;
			info.friend_list?.map(friend => {
				if (friend === otherID)
					isF = true
			})
			info.block_list?.map(block => {
				if (block === otherID)
					isB = true
			})

			return ({history:history, win:win, lose:lose, friend:isF, block:isB})
		}
	}
}
