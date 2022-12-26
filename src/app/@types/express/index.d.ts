declare namespace Express {
  export interface Request {
    generalDirector: {
      id?: string;
    };
    user: {
      id?: string;
    };
  }
}
