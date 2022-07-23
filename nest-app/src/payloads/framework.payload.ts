import { IsString } from 'class-validator';

export class FrameworkPayload {
	@IsString()
	public name: string;

	@IsString()
	public description: string;
}
