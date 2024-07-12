import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MagicMoverModule } from './magic-mover/magic-mover.module';
import { MagicItemModule } from './magic-item/magic-item.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables using @nestjs/config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //  synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MagicMoverModule,
    MagicItemModule,
    LogModule,
  ],
})
export class AppModule {}