import express from 'express';
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'


const router = express()
const prisma = new PrismaClient()


/**
 * @openapi
 * /register:
 *       post:
 *          summary: Register a new user
 *           requestBody:
 *                      
 * 
 * 
 */

router.post("/register", async(req, res) => {
    try {
        //requesting the body
        const { name, email, password } = req.body;
        //validating the provided data
        if(!name || !email || !password) {
            return res.status(400).json({
                error: "name, email, password are needed"
            })
    
        }

        //check if the user alreday exisi
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })


    } catch (error) {
        
    }

       


    
    
})


/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/", (req, res) => {
  res.json({ message: "Evan welcome to the nodejs class" });
});


/**
 * @openapi
 * /users/{id}:
 *  get:
 *    summary: Get user by ID
 *    parameters:
 *              
 * 
 */
router.get("/:id", (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

export default router