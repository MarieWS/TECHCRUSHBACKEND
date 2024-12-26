import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        res.status(401).json({message: "Access denied"})
    }

    try {
        const editedToken = token.replace("Bearer ", "");
        const decodedToken = jwt.verify(editedToken, process.env.JWT_SECRET);
        req.user = decodedToken.userID;
        next();
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export default auth;