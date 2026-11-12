import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "backend-common";
import { ListPaymentsQueryDto } from "./dto/list-payments-query.dto";
import { PaymentsService } from "./payments.service";

@ApiTags("Admin: payments")
@ApiBearerAuth()
@Roles("admin")
@Controller("admin/payments")
export class AdminPaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Get()
  list(@Query() query: ListPaymentsQueryDto) {
    return this.payments.list(query);
  }
}
