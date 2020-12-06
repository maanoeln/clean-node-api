import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../Errors/missing-params-error'
import { badRequest } from '../Helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-valdiator'
import { InvalidParamError } from '../Errors/invalid-param-error'
import { ServerError } from '../Errors/server-error'

export class SignUpController implements Controller {
  private readonly emailValdiator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValdiator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValdiator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
