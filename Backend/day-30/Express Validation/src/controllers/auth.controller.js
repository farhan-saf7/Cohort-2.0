export async function registerUser(req, res, next) {
    res.status(201).json({
        message: "user registerd sucessfully"
    })
}