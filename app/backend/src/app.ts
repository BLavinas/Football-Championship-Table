import 'express-async-errors';
import * as express from 'express';
import loginRoutes from './api/routes/Login.routes';
import teamRoutes from './api/routes/Team.routes';
import ErrorHandler from './api/Middlewares/errorHandler';
import matchRoutes from './api/routes/Match.routes';
import leaderboardRoutes from './api/routes/Leaderboard.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();
    this.initMiddlewares();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private routes(): void {
    this.app.use('/teams', teamRoutes);
    this.app.use('/login', loginRoutes);
    this.app.use('/matches', matchRoutes);
    this.app.use('/leaderboard', leaderboardRoutes);
  }

  private initMiddlewares() {
    this.app.use(ErrorHandler.handle);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
