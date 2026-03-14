import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MetadataKey } from '@common/constants/common.constant';
import { getProcessId } from '@common/utils/string.util';

export const ProcessId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request[MetadataKey.PROCESS_ID] || getProcessId();
});
