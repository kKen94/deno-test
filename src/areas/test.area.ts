import { Area } from '../../deps.ts';
import { TestController } from '../controllers/mod.ts';

@Area({
  controllers: [TestController],
})
export class TestArea {}
