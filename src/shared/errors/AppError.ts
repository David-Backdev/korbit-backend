export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        
    }

}

export class notFoundError extends AppError {
    constructor(message: string){
        super(message, 404);
    }
}

export class conflictError extends AppError {
    constructor (message: string){
        super(message, 409);
    }
}
