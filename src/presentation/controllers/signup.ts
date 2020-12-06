import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../Errors/missing-params-error'
import { badRequest } from '../Helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email']

    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
