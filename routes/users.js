import 'dotenv/config'; 
import express from 'express';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaPg } from "@prisma/adapter-pg";


// You create a Prisma adapter using your DATABASE_URL,
// then pass that adapter into PrismaClient — this replaces the old url in schema.prisma
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// FIXED: Use Router() not express()
const router = Router();

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", async(req, res) => {
    try {
        //requesting the body
        const { name, email, password } = req.body;
        
        //validating the provided data
        if(!name || !email || !password) {
            return res.status(400).json({
                error: "name, email, password are needed"
            });
        }
        
        //check if the user already exists
        const existingUser = await prisma.user.findUnique({where: {email}});

        if(existingUser) {
            return res.status(409).json({  // FIXED: Use 409 Conflict instead of 500
                error: "user already exists"
            });
        }

        const salt = 10;
        const hashed_password = await bcrypt.hash(password, salt);

        //save to db
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed_password
            },
            select: {
                id: true,
                name: true,
                email: true,
                //createdAt: true
                // Don't return the password
            }
        });

        res.status(201).json({message: "user created successfully", user}); // FIXED: Use 201 Created

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ 
            error: "Internal server error" 
        });
    }
});

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", async (req, res) => {
    const users = await prisma.user.findMany({where:{
        name: true,
        email:true
    }})
    res.status(200).json(users)
});

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get("/:id", async (req, res) => {
    try {
        const id  = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                name:true,
                email: true
            }
        });
        if(!user) {
            return res.status(400).json({error: "user not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.error("Get user error", error)
        res.status(500).json({error: "internal server error"})
        
    }

    
});

export default router;