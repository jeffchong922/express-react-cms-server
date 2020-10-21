import { HttpRequest, HttpResponse } from "../../helpers/express-callback"
import logger from "../../helpers/logger"
import { FetchUserType } from "../use-cases"

interface MakeSignInProps {
  fetchUser: FetchUserType
}

export default function makeSignIn ({ fetchUser }: MakeSignInProps) {
  return async function signIn (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const userInfo = httpRequest.body
      const fetched = await fetchUser(userInfo)
      return {
        headers,
        statusCode: 200,
        body: {
          fetched
        }
      }
    } catch (e) {
      logger.error(`sign-in 错误: ${e.message}`)
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