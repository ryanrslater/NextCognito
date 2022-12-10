# Next Cognito

Next Cognito is an open source package that provides a solution for authentication that's built on top of the [AWS sdk](https://www.npmjs.com/package/@aws-sdk/client-cognito-identity-provider) for Cognito for [Next.js](https://nextjs.org/).

## Getting Started

```
npm i nextcognito
```
In order to get started you'll need to setup a few environment variables

```
NEXT_COGNITO_REGION=The aws region cognito is located
NEXT_COGNITO_CLIENT_ID=The client id of your Cognito user pool
NEXT_COGNITO_ACCESS_KEY_ID=Your IAM access key that has cognito permissions
NEXT_COGNITO_SECRET_ACCESS_KEY=You IAM seccress access key
```

## Create your Next endpoint where you want to use NextCognito
eg
`/api/auth/signin`
```
import "NextCognito" from "NextCognito"

const new nextcognito = new NextCognito()
```
