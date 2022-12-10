import type {
  NextApiHandler,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
} from "next";

import {
  AuthFlowType,
  CognitoIdentityProvider,
  InitiateAuthCommandInput,
  SignUpCommandInput,
  ConfirmSignUpRequest,
  InitiateAuthCommandOutput,
  ConfirmSignUpCommandOutput,
  GetUserCommandInput,

} from '@aws-sdk/client-cognito-identity-provider'

class CognitoAuth {
  private region: string | undefined;

  private client;

  private clientId: string | undefined;

  private tokenName = 'next-cognito-token'

  private accessKeyId: string | undefined;

  private secretAccessKey: string | undefined;

  constructor() {
    this.region = process.env.NEXT_COGNITO_REGION

    if (!this.region) throw new Error('Missing region')

    this.clientId = process.env.NEXT_COGNITO_CLIENT_ID

    if (!this.clientId) throw new Error('Missing client id')

    this.accessKeyId = process.env.NEXT_COGNITO_ACCESS_KEY_ID

    if (!this.accessKeyId) throw new Error('Missing access key id')

    this.secretAccessKey = process.env.NEXT_COGNITO_SECRET_ACCESS_KEY

    if (!this.secretAccessKey) throw new Error('Missing secret access key')

    this.client = new CognitoIdentityProvider({ region: this.region, credentials: { accessKeyId: this.accessKeyId, secretAccessKey: this.secretAccessKey } })

  }

  private setToken(token: string, expires?: number, NextApiResponse?: NextApiResponse) {
    if (NextApiResponse) {
      NextApiResponse.setHeader('Set-Cookie', `${this.tokenName}=${token}; HttpOnly; Path=/; Max-Age=${expires}`)
    } else {
      document.cookie = `${this.tokenName}=${token}; HttpOnly; Path=/; Max-Age=${expires}`
    }
  }
    

  async initiateAuth(USERNAME: string | undefined, PASSWORD: string | undefined, NextApiResponse: NextApiResponse): Promise<InitiateAuthCommandOutput> {

    if (!USERNAME) throw new Error('Missing username')
    if (!PASSWORD) throw new Error('Missing password')

    const params: InitiateAuthCommandInput = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME,
        PASSWORD,
      }
    }
    const initiateAuth = await this.client.initiateAuth(params)
    initiateAuth.AuthenticationResult?.AccessToken && this.setToken(initiateAuth.AuthenticationResult.AccessToken, initiateAuth.AuthenticationResult.ExpiresIn, NextApiResponse)
    return await this.client.initiateAuth(params)
  }

  async getServerSideUser(context: GetServerSidePropsContext): Promise<{username: string | null, sub: string | null}> {
    const token = context.req.cookies[this.tokenName]
    if (!token) throw new Error('Missing token')
    const params: GetUserCommandInput = {
      AccessToken: token,
    }
    const user = await this.client.getUser(params)

    const sub = user.UserAttributes?.find((attr) => attr.Name == 'sub')

    return {sub: sub?.Value || null, username: user.Username || null}
  }
}

export default CognitoAuth