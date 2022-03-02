import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SearchOperatorService } from './SearchOperatorService';

class SearchOperatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const searchOperatorService = container.resolve(SearchOperatorService);

    const operators = await searchOperatorService.execute(
      name?.toString() || '',
    );

    return response.status(200).json(operators);
  }
}

export { SearchOperatorController };
