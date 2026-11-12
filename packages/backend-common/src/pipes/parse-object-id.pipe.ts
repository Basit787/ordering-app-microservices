import { BadRequestException, Injectable, type PipeTransform } from "@nestjs/common";

// Route ids are MongoDB ObjectIds; anything else is a 400 instead of a Prisma error
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!/^[a-f\d]{24}$/i.test(value)) throw new BadRequestException("Invalid id");
    return value;
  }
}
