import { KafkaOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core';
import { KafkaConsumerModule } from './kafka-consumer.module';

async function bootstrap() {
  const kafkaOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['127.0.0.1:9092'],
      },
      consumer: {
        groupId: '1',
        allowAutoTopicCreation: true,
      },
    },
  };

  const app = await NestFactory.create(KafkaConsumerModule);
  app.connectMicroservice(kafkaOptions);
  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
