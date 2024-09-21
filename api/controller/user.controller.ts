import { Request, Response } from 'express';
export const testController = (req: Request, res: Response, next: Function) => {
    console.log("in test controller");
    next();
}

// export { testController };
