// import { User } from '../../models/index.js'


// /**
//  *  fetch all users
//  */
// const getAll = async (req, res) => {
//     try {
//         //fetching all the data from users table
//         const users = await User.findAll();
//         res.status(200).send({ data: users, message: "successfully fetched data" })
//     } catch (e) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }

// /** 
//  *  create new user
// */

// const create = async (req, res) => {

//     try {
//         const body = req.body
//         console.log(req.body)
//         //validation
//         if (!body?.email || !body?.name || !body?.password)
//             return res.status(500).send({ message: "Invalid paylod" });
//         const users = await User.create({
//             name: body.name,
//             email: body.email,
//             password: body.password
//         });
//         res.status(201).send({ data: users, message: "successfully created user" })
//     } catch (e) {
//         console.log(e)
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }

// /**
//  *  update existing user
//  */

// const update = async (req, res) => {

//     try {
//         const { id = null } = req.params;
//         const body = req.body;
//         console.log(req.params)
//         //checking if user exist or not
//         const oldUser = await User.findOne({ where: { id } })
//         if (!oldUser) {
//             return res.status(500).send({ message: "User not found" });
//         }
//         oldUser.name = body.name;
//         oldUser.password = body.password || oldUser.password;
//         oldUser.email = body.email
//         oldUser.save();
//         res.status(201).send({ data: oldUser, message: "user updated successfully" })
//     } catch (e) {
//         console.log(e)
//         res.status(500).json({ error: 'Failed to update users' });
//     }
// }

// /**
//  *  delete user 
//  */
// const delelteById = async (req, res) => {

//     try {
//         const { id = null } = req.params;
//         const oldUser = await User.findOne({ where: { id } })

//         //checking if user exist or not
//         if (!oldUser) {
//             return res.status(500).send({ message: "User not found" });
//         }
//         oldUser.destroy();
//         res.status(201).send({ message: "user deleted successfully" })
//     } catch (e) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }

// /**
//  *  fetch user by id
//  */
// const getById = async (req, res) => {

//     try {
//         const { id = null } = req.params;
//         const user = await User.findOne({ where: { id } })
//         if (!user) {
//             return res.status(500).send({ message: "User not found" });
//         }
//         res.status(201).send({ message: "user fetched successfully", data: user })
//     } catch (e) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }


// export const userController = {
//     getAll,
//     create,
//     getById,
//     delelteById,
//     update
// }
import { User } from '../../models/index.js'

/**
 * fetch all users
 */
const getAll = async (req, res) => {
    try {
        //fetching all the data from users table
        const users = await User.findAll();
        res.status(200).send({ data: users, message: "successfully fetched data" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

/**
 * create new user
 */
import bcrypt from 'bcrypt';

const create = async (req, res) => {
    try {
        const body = req.body
        console.log(req.body)
        
        //validation for required fields
        if (!body?.email || !body?.name || !body?.password) {
            return res.status(400).send({ message: "Name, email, and password are required" });
        }

        // Validate gender if provided
        if (body.gender && !['male', 'female', 'other'].includes(body.gender)) {
            return res.status(400).send({ message: "Gender must be 'male', 'female', or 'other'" });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const users = await User.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            address: body.address || null,
            gender: body.gender || null,
            password: hashedPassword
        });
        
        res.status(201).send({ data: users, message: "successfully created user" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Failed to create user' });
    }
}

/**
 * update existing user
 */
const update = async (req, res) => {
    try {
        const { id = null } = req.params;
        const body = req.body;
        console.log(req.params)
        
        //checking if user exist or not
        const oldUser = await User.findOne({ where: { id } })
        if (!oldUser) {
            return res.status(404).send({ message: "User not found" });
        }

        // Validate gender if provided
        if (body.gender && !['male', 'female', 'other'].includes(body.gender)) {
            return res.status(400).send({ message: "Gender must be 'male', 'female', or 'other'" });
        }

        // Update fields only if they are provided in the request
        if (body.name) oldUser.name = body.name;
        if (body.email) oldUser.email = body.email;
        if (body.phone) oldUser.phone = body.phone;
        if (body.address !== undefined) oldUser.address = body.address;
        if (body.gender !== undefined) oldUser.gender = body.gender;
         if (body.password) {
            const hashedPassword = await bcrypt.hash(body.password, 10);
            oldUser.password = hashedPassword;
         }

        await oldUser.save();
        
        res.status(200).send({ data: oldUser, message: "user updated successfully" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Failed to update user' });
    }
}

/**
 * delete user
 */
const deleteById = async (req, res) => {
    try {
        const { id = null } = req.params;
        const oldUser = await User.findOne({ where: { id } })
        
        //checking if user exist or not
        if (!oldUser) {
            return res.status(404).send({ message: "User not found" });
        }
        
        await oldUser.destroy();
        res.status(200).send({ message: "user deleted successfully" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

/**
 * fetch user by id
 */
const getById = async (req, res) => {
    try {
        const { id = null } = req.params;
        console.log("getById called with id:", id);
        const user = await User.findOne({ where: { id } })
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "user fetched successfully", data: user })
    } catch (e) {
        console.log("Error in getById:", e)
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

export const userController = {
    getAll,
    create,
    getById,
    deleteById,
    update
}