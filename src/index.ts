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
  GetUserCommandInput
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
}

export default CognitoAuth