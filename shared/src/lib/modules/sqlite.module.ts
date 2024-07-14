import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: "sqliteConnection",
        type: "sqlite",
        database: ":memory:",
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class SqliteModule {}
