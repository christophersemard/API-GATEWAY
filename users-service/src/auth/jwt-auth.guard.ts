import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToRpc().getData(); // Pour un appel RPC, on utilise les données envoyées
    const token = data.token; // On suppose que le token est passé dans `data.token`

    if (!token) {
      throw new RpcException({
        statusCode: 401,
        message: 'Token not found',
        error: 'Unauthorized',
      });
    }

    try {
      // Valider et décoder le token
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: 'secret',
      });

      // Si la validation réussit, on peut ajouter le token décodé à `data.user` pour une utilisation ultérieure
      data.user = decodedToken;
      return true;
    } catch (error) {
      // En cas d'erreur de validation, renvoyer une exception RPC
      throw new RpcException({
        statusCode: 401,
        message: 'Invalid or expired token',
        error: 'Unauthorized',
      });
    }
  }
}
