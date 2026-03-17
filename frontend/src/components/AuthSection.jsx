export default function AuthSection({signinform,signin,handleSignin,submitSignin,signinmessage,signupform, signup,handleSignup,submitSignup,signupmsg }) {
    return (
        <div>
            <button type="button" onClick={signin}>Sign in</button>
            {signinform && (
                <form>
                    <h3>Email: </h3> <input type="email" name="email" onChange={handleSignin}></input>
                    <h3>Password: </h3> <input type="password" name="password" onChange={handleSignin}></input>
                    <button type="button" onClick={submitSignin}>Submit Sign in</button>
                    {signinmessage && (
                        <h3>{signinmessage}</h3>
                    )}
                </form>
            )}
            <button type="button" onClick={signup}>Sign up</button>
            {signupform && (
                <form>
                    <h3>Email: </h3><input type="email" name="email" onChange={handleSignup}></input>
                    <h3>Password: </h3><input type="password" name="password" onChange={handleSignup}></input>
                    <button type="button" onClick={submitSignup}>Submit sign up</button>
                    {signupmsg && (
                        <h3>{signupmsg}</h3>
                    )}
                </form>
            )}
        </div>
    )
}