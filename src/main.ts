import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}
bootstrap();
