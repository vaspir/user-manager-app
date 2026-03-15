const express = require("express")
const cors = require("cors")
const path = require("path")
const store = require("./usersStore")
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const app = express()
app.use(cors())
app.use(express.json())

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "User Manager API", version: "1.0.0" },
    servers: [{ url: "/" }]
  },
  apis: ["./server/server.js"]
}
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)))

// User validation
const validateUser = (user) => {
  if (!user.username) return "Username is required"
  if (!user.email) return "Email is required"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(user.email)) return "Invalid email"
  return null
}

// API routes
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   address:
 *                     type: string
 *                   hobbies:
 *                     type: array
 *                     items:
 *                       type: string
 */
app.get("/api/users", (req, res) => res.json(store.getAll()))

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               title:
 *                 type: string
 *               address:
 *                 type: string
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 */
app.post("/api/users", (req, res) => {
  const error = validateUser(req.body)
  if (error) return res.status(400).json({ error })
  res.json(store.add(req.body))
})

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               title:
 *                 type: string
 *               address:
 *                 type: string
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
app.put("/api/users/:id", (req, res) => {
  store.update(Number(req.params.id), req.body)
  res.json({ success: true })
})

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
app.delete("/api/users/:id", (req, res) => {
  store.remove(Number(req.params.id))
  res.json({ success: true })
})

// Serve React app
app.use(express.static(path.join(__dirname, "../client/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
})

// Use Render PORT
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))