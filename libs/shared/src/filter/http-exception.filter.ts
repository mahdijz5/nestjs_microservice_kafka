import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException) {
        const error: any = exception.getResponse();

        let convertedError : any= new RpcException(error.message)
        convertedError.statusCode =error.statusCode        
        throw convertedError
    }
}