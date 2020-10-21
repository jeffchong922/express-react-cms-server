import { HttpRequest, HttpResponse } from "../../helpers/express-callback"
import logger from "../../helpers/logger"
import { AddUserType } from "../use-cases"

interface MakeSignUpProps {
  addUser: AddUserType
}

export default function makeSignUp ({ addUser }: MakeSignUpProps) {
  return async function signUp (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const userInfo = httpRequest.body
      const registered = await addUser(userInfo)
      return {
        headers,
        statusCode: 201,
        body: {
          registered
        }
      }
    } catch (e) {
      logger.error(`sign-up 错误: ${e.message}`)
      return {
        headers,
        statusCode: e.statusCode || 400,
        body: {
          error: e.message
        }
      }
    }
  }
}