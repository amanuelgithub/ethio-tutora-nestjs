import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_CONFIG } from './commons/constants';
import { IAppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // get app config
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>(APP_CONFIG);

  // setup api global prefix
  const globalPrefix = appConfig.APP_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Ethio-Tutora')
    .setDescription('A tutoring platform for Ethiopians.')
    .setVersion('1.0')
    .addTag('#Ethio-Tutora')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Ethio-Tutora API doc',
  };

  SwaggerModule.setup('api', app, document, customOptions);

  const appPort = process.env.PORT || appConfig.APP_PORT;

  await app.listen(appPort);
}
bootstrap();
