import { Controller } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';
import { KafkaConsumerService } from './kafka-consumer.service';

@Controller()
export class KafkaConsumerController {
  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {}

  @EventPattern('cardCreated', Transport.KAFKA)
  async handleCardCreated(data: Record<string, unknown>) {
    console.log('DATA', data);
  }
}
