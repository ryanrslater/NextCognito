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

## Error handling

Under the hood, this uses the Cognito SDK, which has it's own internal error handling response where the have their own [error codes](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/CommonErrors.html)

Otherwise the Next Cognito error messages are related to missing environment variables or parameters

## Create your Next endpoint where you want to use NextCognito

```
import "NextCognito" from "NextCognito"

const nextcognito = new NextCognito()
```

### Sign in
```
import "NextCognito" from "NextCognito"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

const nextcognito = new NextCognito()

try {
    await nextcognito.signIn(username, password, res)

    //Handle the return how ever you like

    return res.status(201).json({success: true})

} catch (error) {

     //Handle the return how ever you like

    return res.status(400).json({error})
    }
}
```

### Sign out
```
import "NextCognito" from "NextCognito"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

const nextcognito = new NextCognito()

try {
    await nextcognito.signOut(res, res)

    //Handle the return how ever you like

    return res.status(201).json({success: true})
    
} catch (error) {

     //Handle the return how ever you like

    return res.status(400).json({error})
    }
}
```

### Sign up
```
import "NextCognito" from "NextCognito"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

const nextcognito = new NextCognito()

try {
    await nextcognito.signUp(username, password, email)

    //Handle the return how ever you like

    return res.status(201).json({success: true})
    
} catch (error) {

     //Handle the return how ever you like

    return res.status(400).json({error})
    }
}
```

### Confirm sign up
Cognito requires users to confirm their accounts before they can be used

```
import "NextCognito" from "NextCognito"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

const nextcognito = new NextCognito()

try {
    await nextcognito.confirmSignUp(username, code)

    //Handle the return how ever you like

    return res.status(201).json({success: true})
    
} catch (error) {

     //Handle the return how ever you like

    return res.status(400).json({error})
    }
}
```