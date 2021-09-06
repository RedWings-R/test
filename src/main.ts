import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { init } from './initialisation';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config()

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API KM_NDF')
    .setDescription('Description')
    .setVersion('1.0')
    .addTag('km_ndf')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(PORT);

  await init()

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
