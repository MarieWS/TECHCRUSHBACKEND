import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);

    if (!token) {
        res.status(401).json({message: "Access denied"})
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken.userID;
        next();
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export default auth;