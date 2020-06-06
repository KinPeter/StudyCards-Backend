import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const swaggerOptions = new DocumentBuilder()
    .setTitle('StudyCards')
    .setDescription('The StudyCards API documentation')
    .setVersion('0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);

  const port = process.env.PORT || 3300;
  await app.listen(port);
}
bootstrap();
