import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { UserRepository } from './modules/user/user.repository';
import { UserService } from './modules/user/user.service';
import { MapperService } from './shared/mapper.service';


@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule],
  controllers: [AppController],
  providers: [AppService, UserService, MapperService, UserRepository],
})
export class AppModule {
  static port: number | string;
  
  constructor(private readonly _configService: ConfigService){
    AppModule.port = this._configService.get(Configuration.PORT);

  }
}
