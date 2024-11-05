import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP, // Spécifie le type de transport, par exemple TCP
      options: {
        host: 'localhost', // Définis l'hôte
        port: 3001, // Définis le port
      },
    },
  );

  await app.listen(); // N'oublie pas d'écouter les connexions
}

bootstrap();
