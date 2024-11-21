import { ApiResponseType } from "./api-response-type";

export class ApiResponse {
    constructor(
        public code: ApiResponseType,
        public title: string,
        public message: string,
        public data: any
    ) {}
}
