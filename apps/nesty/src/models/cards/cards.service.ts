import { Injectable } from "@nestjs/common";

interface Cat {
  meow: boolean;
}

@Injectable()
export class CatsService {
  constructor(private queryRunnerService: QueryRunnerService) {}

  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}

