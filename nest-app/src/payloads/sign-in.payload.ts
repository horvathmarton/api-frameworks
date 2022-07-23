import { IsString } from 'class-validator';

export class SignInPayload {
	@IsString()
	public username: string;

	@IsString()
	public password: string;
}
