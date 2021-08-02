import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            id: "credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch("your_api/login", {
                    method: 'POST',
                    body: JSON.stringify(    {
                        username: credentials.username,
                        password: credentials.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                    console.log(user);
                // If no error and we have user data, return it
                if (res.ok && user.status !== 401) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
        // ...add more providers here
    ],
    pages: {
        // signIn: '/',
        // signOut: '/auth/signout',
        // error: '/#error?error=', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New us
    }
    // A database is optional, but required to persist accounts in a database
//    database: process.env.DATABASE_URL,
})