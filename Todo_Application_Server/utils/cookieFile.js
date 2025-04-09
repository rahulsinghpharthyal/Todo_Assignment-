export const sentToken = (message, user, res, statusCode, accessToken) => {
    const options = {
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true, 
        secure: false,
        sameSite: 'none',
    };
    console.log('this is accessToken from sentToken', accessToken)
    return res.cookie("token", accessToken, options).status(statusCode).json({
        success: true,
        Data: {user, accessToken},
        message,
    })
}